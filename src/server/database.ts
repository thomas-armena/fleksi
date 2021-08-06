import { MongoClient, Collection, UpdateResult, Document, Db, GridFSBucket, GridFSBucketReadStream } from 'mongodb';
import FileSystem from './filesystem';
import { Thing, ThingObject, PathNodes } from '../utils/types';
import { getPathNodesFromURL } from '../utils/path';
import { KIND } from '../utils/kinds';
import fs, { read } from 'fs';

const DEFAULT_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fleksi';
const DB_WEB_COLLECTION = 'root';

class Database {
    url: string;
    client: MongoClient;
    bucket: GridFSBucket;

    constructor(url = DEFAULT_URL) {
        this.url = url;
        this.client = new MongoClient(url);
        this.bucket = new GridFSBucket(this._getDatabase());
    }

    async populateWithInitialData(): Promise<UpdateResult | Document> {
        await this.connect();
        this.bucket.drop();
        const fileSystem = new FileSystem();
        const initialRoot = fileSystem.getRoot();
        console.log(initialRoot);
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: initialRoot },
            { upsert: true }
        );
        await this._uploadFiles(initialRoot, fileSystem, []);
        await this.close();
        return result;
    }

    async getThing(path: string): Promise<Thing> {
        const pathNodes = getPathNodesFromURL(path);
        let currThing: Thing = await this._getRoot();
        for (const pathNode of pathNodes) {
            const currThingObject = currThing as ThingObject;
            const next = currThingObject[pathNode] as Thing;
            if (next) currThing = next;
            else break;
        }
        return currThing;
    }

    async setThing(path: string, updatedThing: Thing): Promise<UpdateResult | Document> {
        await this.connect();
        const pathNodes = getPathNodesFromURL(path);
        const key = pathNodes.join(".");
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: { [key]: updatedThing } },
            { upsert: true }
        );
        await this.close();
        return result;
    }

    getFileWriteStream(url: string): GridFSBucketReadStream {
        this.connect();
        return this.bucket.openDownloadStreamByName(url)
            .on('end', () => this.close())
            .on('close', () => this.close());
    }

    async connect(): Promise<void> {
        await this.client.connect();
    }

    async close(): Promise<void>  {
        await this.client.close();
    }

    async _getRoot(): Promise<Thing> {
        await this.connect();
        const result = await this._getRootCollection().findOne({ _isRoot: true })
        await this.close();
        return result;
    }

    _getDatabase(): Db {
        return this.client.db(DB_NAME);
    }

    _getRootCollection(): Collection<Document> {
        return this._getDatabase().collection(DB_WEB_COLLECTION);
    }

    async _uploadFiles(thingObject: ThingObject, fileSystem: FileSystem, path: PathNodes) {
        for (const key of Object.keys(thingObject)) {
            const childThing = thingObject[key];
            if (typeof childThing === 'object') {
                const childThingObject = childThing as ThingObject;
                if (childThingObject._kind === KIND.FILE) {
                    const fileDir = [...path, key].join('/');
                    try {
                        await this._uploadFile(fileDir, fileSystem);
                    } catch(error) {
                        console.error(error);
                    }
                }
                await this._uploadFiles(childThingObject, fileSystem, [...path, key]);
            }
        }
    }

    _uploadFile(fileDir: string, fileSystem: FileSystem) {
        return new Promise<void>((resolve, reject) => {
            const readStream = fileSystem.readStreams[fileDir];
            const writeStream = this.bucket.openUploadStream(fileDir)
                .on('error', (err) => reject(err))
                .on('finish', () => resolve())
            readStream.pipe(writeStream as any);
        })
    }
}

export default new Database();