import { WORKING_DIR } from './constants.js';
import path from 'path';
import fs from 'fs';
import { opendir } from 'fs/promises';

const DEFAULT_ROOT = path.join(WORKING_DIR, 'root');

class FlexiNodes {
    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
    }

    async fromURL(url) {
        let flexiNodes = await this._getFleksiNodes(this.rootPath);
        const urlNodes = url.split('/');
        urlNodes.splice(0,1)
        let currNode = {...flexiNodes};
        for(let urlNode of urlNodes) {
            const childNode = this._getChildNodeByName(currNode, urlNode);
            if (childNode) {
                currNode = childNode;
            }
        }
        return currNode;
    }

    async _getFleksiNodes(dir) {
        const baseName = path.basename(dir);
        let fNode = { name: baseName };
        const metaPath = path.join(dir, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = this._readJson(metaPath);
            fNode = { ...fNode, ...meta};
        }
        if (!fNode.component && this._isUppercase(baseName[0])) {
            fNode.component = baseName;
        };
        if (!fNode.children) fNode.children = await this._getChildren(dir);
        return fNode;
    }
    
    async _getChildren(dirPath) {
        let children = [];
        try {
            const dir = await opendir(dirPath);
            for await (const dirent of dir) {
                const childDir = path.join(dirPath, dirent.name)
                if (dirent.isDirectory()) {
                    let childNodes = await this._getFleksiNodes(childDir);
                    children.push(childNodes);
                }
            }
        } catch (err) {
            console.error(err);
        }
        children = this._sortByOrder(children);
        return children;
    }
    
    _readJson(filePath) {
        const rawdata = fs.readFileSync(filePath);
        return JSON.parse(rawdata);
    }
    
    _sortByOrder(nodes) {
        return nodes.sort((a, b) => {
            if (!b.order) return -1;
            if (!a.order) return 1; 
            return a.order - b.order;
        })
    }
    
    _isUppercase(char) {
        return char === char.toUpperCase();
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

export default FlexiNodes;