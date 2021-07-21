import { MongoClient } from 'mongodb';
import FileSystem from '../filesystem/index.js';

const DEFAULT_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fleksi';
const DB_WEB_COLLECTION = 'root';

class Database {

    constructor(url = DEFAULT_URL) {
        this.url = url;
        this.client = new MongoClient(url);
    }

    async connect() {
        await this.client.connect();
    }

    async close() {
        await this.client.close();
    }

    async populateWithInitialData() {
        const fileSystem = new FileSystem();
        const initialRoot = fileSystem.getRoot();
        const result = await this._getRootCollection().updateOne(
            { _isRoot: true },
            { $set: initialRoot },
            { upsert: true }
        );
        return result;
    }

    _getDatabase() {
        return this.client.db(DB_NAME)
    }

    _getRootCollection() {
        return this._getDatabase().collection(DB_WEB_COLLECTION);
    }

}

export default Database;