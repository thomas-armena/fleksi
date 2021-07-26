import { MongoClient } from 'mongodb';
import FileSystem from '../filesystem/index.js';
import { getPathNodesFromURL } from '../nodeConfig.js';

const DEFAULT_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fleksi';
const DB_WEB_COLLECTION = 'root';

class Database {

    constructor(url = DEFAULT_URL) {
        this.url = url;
        this.client = new MongoClient(url);
    }

    async populateWithInitialData() {
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

    async getNode(path) {
        const pathNodes = getPathNodesFromURL(path);
        let curr = await this._getRoot();
        for (let pathNode of pathNodes) {
            const next = curr[pathNode];
            if (next) curr = next;
            else break;
        }
        return curr;
    }

    async setNode(path, updatedNode) {
        await this._connect();
        const pathNodes = this._getPathNodes(path);
        const key = pathNodes.join(".");
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: { [key]: updatedNode } },
            { upsert: true }
        );
        await this._close();
        return result;
    }

    async _connect() {
        await this.client.connect();
    }

    async _close() {
        await this.client.close();
    }

    async _getRoot() {
        await this._connect();
        this.connect;
        const result = await this._getRootCollection().findOne({ _isRoot: true })
        await this._close();
        return result;
    }

    _getDatabase() {
        return this.client.db(DB_NAME)
    }

    _getRootCollection() {
        return this._getDatabase().collection(DB_WEB_COLLECTION);
    }
}

export default new Database();