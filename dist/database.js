"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const filesystem_1 = __importDefault(require("./filesystem"));
const thing_1 = require("./thing");
const DEFAULT_URL = 'mongodb://localhost:27017';
const DB_NAME = 'fleksi';
const DB_WEB_COLLECTION = 'root';
class Database {
    constructor(url = DEFAULT_URL) {
        this.url = url;
        this.client = new mongodb_1.MongoClient(url);
    }
    populateWithInitialData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._connect();
            const fileSystem = new filesystem_1.default();
            const initialRoot = fileSystem.getRoot();
            const result = yield this._getRootCollection().updateOne({ _isRoot: true }, { $set: initialRoot }, { upsert: true });
            yield this._close();
            return result;
        });
    }
    getThing(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathNodes = thing_1.getPathNodesFromURL(path);
            let currThing = yield this._getRoot();
            for (const pathNode of pathNodes) {
                const currThingObject = currThing;
                const next = currThingObject[pathNode];
                if (next)
                    currThing = next;
                else
                    break;
            }
            return currThing;
        });
    }
    setThing(path, updatedThing) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._connect();
            const pathNodes = thing_1.getPathNodesFromURL(path);
            const key = pathNodes.join(".");
            const result = yield this._getRootCollection().updateOne({ _isRoot: true }, { $set: { [key]: updatedThing } }, { upsert: true });
            yield this._close();
            return result;
        });
    }
    _connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
        });
    }
    _close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
    _getRoot() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._connect();
            const result = yield this._getRootCollection().findOne({ _isRoot: true });
            yield this._close();
            return result;
        });
    }
    _getDatabase() {
        return this.client.db(DB_NAME);
    }
    _getRootCollection() {
        return this._getDatabase().collection(DB_WEB_COLLECTION);
    }
}
exports.default = new Database();
//# sourceMappingURL=database.js.map