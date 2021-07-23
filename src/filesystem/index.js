import { WORKING_DIR } from '../constants.js';
import path from 'path';
import fs from 'fs';
import { opendir } from 'fs/promises';

const DEFAULT_ROOT = path.join(WORKING_DIR, 'initial');

class FileSystem {
    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
    }

    getRoot() {
        let root = this._getNodesFromDir(this.rootPath);
        root._isRoot = true;
        return root;
    }

    getNodeFromURL(url) {
        let flexiNodes = this._getNodesFromDir(this.rootPath);
        const urlNodes = url.split('/');
        urlNodes.splice(0,1)
        let currNode = {...flexiNodes};
        for(let urlNode of urlNodes) {
            const childNode = currNode[urlNode];
            if (childNode) {
                currNode = childNode;
            }
        }
        return currNode;
    }

    _getNodesFromDir(dir) {

        if (!fs.lstatSync(dir).isDirectory()) return;

        let fNode = {};
        const metaPath = path.join(dir, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = this._readJson(metaPath);
            fNode = { ...fNode, ...meta};
        }
        for (const fileName of fs.readdirSync(dir)){
            const childDir = path.join(dir, fileName);
            const childNode = this._getNodesFromDir(childDir);
            if (!childNode) continue;
            if (fNode[fileName]) {
                fNode[fileName] = { ...fNode[fileName], ...childNode}
            } else {
                fNode[fileName] = childNode;
            }
        }
        return fNode;
    }
    
    _readJson(filePath) {
        const rawdata = fs.readFileSync(filePath);
        return JSON.parse(rawdata);
    }

    _getChildNodeByName(obj, name) {
        if (!obj.children) {
            return null;
        }
        for (let child of obj.children) {
            if (child.name === name) {
                return child;
            }
        }
        return null;
    }
}

export default FileSystem;