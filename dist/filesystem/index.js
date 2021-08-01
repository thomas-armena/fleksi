"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const DEFAULT_ROOT = path_1.default.join(constants_js_1.WORKING_DIR, 'initial');
class FileSystem {
    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
    }
    getRoot() {
        const root = this._getNodesFromDir(this.rootPath);
        root._isRoot = true;
        return root;
    }
    getNodeFromURL(url) {
        const flexiNodes = this._getNodesFromDir(this.rootPath);
        const urlNodes = url.split('/');
        urlNodes.splice(0, 1);
        let currNode = Object.assign({}, flexiNodes);
        for (const urlNode of urlNodes) {
            const childNode = currNode[urlNode];
            if (childNode) {
                currNode = childNode;
            }
        }
        return currNode;
    }
    _getNodesFromDir(dir) {
        if (!fs_1.default.lstatSync(dir).isDirectory())
            return;
        let fNode = {};
        const metaPath = path_1.default.join(dir, 'meta.json');
        if (fs_1.default.existsSync(metaPath)) {
            const meta = this._readJson(metaPath);
            fNode = Object.assign(Object.assign({}, fNode), meta);
        }
        for (const fileName of fs_1.default.readdirSync(dir)) {
            const childDir = path_1.default.join(dir, fileName);
            const childNode = this._getNodesFromDir(childDir);
            if (!childNode)
                continue;
            if (fNode[fileName]) {
                fNode[fileName] = Object.assign(Object.assign({}, fNode[fileName]), childNode);
            }
            else {
                fNode[fileName] = childNode;
            }
        }
        return fNode;
    }
    _readJson(filePath) {
        const rawdata = fs_1.default.readFileSync(filePath);
        return JSON.parse(rawdata);
    }
    _getChildNodeByName(obj, name) {
        if (!obj.children) {
            return null;
        }
        for (const child of obj.children) {
            if (child.name === name) {
                return child;
            }
        }
        return null;
    }
}
exports.default = FileSystem;
//# sourceMappingURL=index.js.map