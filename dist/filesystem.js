"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const DEFAULT_ROOT = path_1.default.join(constants_1.WORKING_DIR, 'initial');
class FileSystem {
    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
    }
    getRoot() {
        const root = this._getThingObjectFromDir(this.rootPath);
        root._isRoot = true;
        return root;
    }
    getThingFromURL(url) {
        let thing = this._getThingObjectFromDir(this.rootPath);
        const urlNodes = url.split('/');
        urlNodes.splice(0, 1);
        for (const urlNode of urlNodes) {
            const childThing = thing[urlNode];
            if (childThing)
                thing = childThing;
        }
        return thing;
    }
    _getThingObjectFromDir(dir) {
        if (!fs_1.default.lstatSync(dir).isDirectory())
            return null;
        let thingFromDir = {};
        const metaPath = path_1.default.join(dir, 'meta.json');
        if (fs_1.default.existsSync(metaPath)) {
            const meta = this._readJson(metaPath);
            thingFromDir = Object.assign(Object.assign({}, thingFromDir), meta);
        }
        for (const fileName of fs_1.default.readdirSync(dir)) {
            const childDir = path_1.default.join(dir, fileName);
            const childThing = this._getThingObjectFromDir(childDir);
            if (!childThing)
                continue;
            thingFromDir[fileName] = childThing;
        }
        return thingFromDir;
    }
    _readJson(filePath) {
        const rawdata = fs_1.default.readFileSync(filePath).toString();
        return JSON.parse(rawdata);
    }
}
exports.default = FileSystem;
//# sourceMappingURL=filesystem.js.map