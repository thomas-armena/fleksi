import { MongoClient, Collection, UpdateResult, Document, Db } from 'mongodb';
import FileSystem from './filesystem';
import { Thing, ThingObject } from '../utils/types';
import { getPathNodesFromURL } from '../utils/path';

const DEFAULT_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fleksi';
const DB_WEB_COLLECTION = 'root';

class Database {
    url: string;
    client: MongoClient;

    constructor(url = DEFAULT_URL) {
        this.url = url;
        this.client = new MongoClient(url);
    }

    async populateWithInitialData(): Promise<UpdateResult | Document> {
        await this._connect();
        const fileSystem = new FileSystem();
        const initialRoot = fileSystem.getRoot();
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: initialRoot },
            { upsert: true }
        );
        await this._close();
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
        await this._connect();
        const pathNodes = getPathNodesFromURL(path);
        const key = pathNodes.join(".");
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: { [key]: updatedThing } },
            { upsert: true }
        );
        await this._close();
        return result;
    }

    async _connect(): Promise<void> {
        await this.client.connect();
    }

    async _close(): Promise<void>  {
        await this.client.close();
    }

    async _getRoot(): Promise<Thing> {
        await this._connect();
        const result = await this._getRootCollection().findOne({ _isRoot: true })
        await this._close();
        return result;
    }

    _getDatabase(): Db {
        return this.client.db(DB_NAME);
    }

    _getRootCollection(): Collection<Document> {
        return this._getDatabase().collection(DB_WEB_COLLECTION);
    }
}

export default new Database();