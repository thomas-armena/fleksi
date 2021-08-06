"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const kinds_1 = require("../utils/kinds");
const path_2 = require("../utils/path");
const DEFAULT_ROOT = path_1.default.join(constants_1.WORKING_DIR, 'initial');
const FILE_EXT_FILTER = ['png', 'jpg', 'txt', 'jpg', 'jpeg'];
class FileSystem {
    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
        this.readStreams = {};
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
            if (this._isFile(fileName)) {
                const thingFile = {
                    _kind: kinds_1.KIND.FILE,
                };
                const readStream = fs_1.default.createReadStream(childDir);
                this.readStreams[this._getRelativeDir(childDir)] = readStream;
                thingFromDir[fileName] = thingFile;
            }
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
    _isFile(fileName) {
        const s = fileName.split('.');
        if (s.length <= 0)
            return false;
        const extension = s[s.length - 1];
        if (FILE_EXT_FILTER.indexOf(extension) != -1)
            return true;
        else
            return false;
    }
    _getRelativeDir(dir) {
        const rootPathNodes = path_2.getPathNodesFromURL(this.rootPath);
        const dirPathNodes = path_2.getPathNodesFromURL(dir);
        while (rootPathNodes[0] === dirPathNodes[0]) {
            dirPathNodes.shift();
            rootPathNodes.shift();
        }
        return dirPathNodes.join('/');
    }
}
exports.default = FileSystem;
//# sourceMappingURL=filesystem.js.map