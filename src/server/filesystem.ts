import { WORKING_DIR } from '../utils/constants';
import { Thing, ThingObject, ThingFile } from '../utils/types';
import path from 'path';
import fs, { ReadStream } from 'fs';
import { KIND } from '../utils/kinds';
import { getPathNodesFromURL } from '../utils/path';

const DEFAULT_ROOT = path.join(WORKING_DIR, 'initial');

const FILE_EXT_FILTER = ['png', 'jpg', 'txt', 'jpg', 'jpeg'];

export type ReadStreamMap = {
    [key: string]: ReadStream
}

class FileSystem {

    rootPath: string;
    readStreams: ReadStreamMap;

    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
        this.readStreams = {};
    }

    getRoot() : ThingObject {
        const root = this._getThingObjectFromDir(this.rootPath);
        root._isRoot = true;
        return root;
    }

    getThingFromURL(url: string) : Thing {
        let thing: Thing = this._getThingObjectFromDir(this.rootPath);
        const urlNodes = url.split('/');
        urlNodes.splice(0,1)
        for(const urlNode of urlNodes) {
            const childThing: Thing = (thing as ThingObject)[urlNode] as Thing;
            if (childThing) thing = childThing;
        }
        return thing;
    }

    _getThingObjectFromDir(dir: string): ThingObject | null {
        if (!fs.lstatSync(dir).isDirectory()) return null;
        let thingFromDir: ThingObject = {};
        const metaPath = path.join(dir, 'meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = this._readJson(metaPath);
            thingFromDir = { ...thingFromDir, ...meta};
        }
        for (const fileName of fs.readdirSync(dir)){
            const childDir = path.join(dir, fileName);
            if (this._isFile(fileName)) {
                const thingFile: ThingFile = {
                    _kind: KIND.FILE,
                };
                const readStream = fs.createReadStream(childDir);
                this.readStreams[this._getRelativeDir(childDir)] = readStream;
                thingFromDir[fileName] = thingFile;
            }
            const childThing = this._getThingObjectFromDir(childDir);
            if (!childThing) continue;
            thingFromDir[fileName] = childThing;
        }
        return thingFromDir;
    }

    _readJson(filePath: string): ThingObject {
        const rawdata = fs.readFileSync(filePath).toString();
        return JSON.parse(rawdata);
    }

    _isFile(fileName: string): boolean {
        const s = fileName.split('.');
        if (s.length <= 0) return false;
        const extension = s[s.length-1];
        if (FILE_EXT_FILTER.indexOf(extension) != -1) return true;
        else return false;
    }

    _getRelativeDir(dir: string): string {
        const rootPathNodes = getPathNodesFromURL(this.rootPath);
        const dirPathNodes = getPathNodesFromURL(dir);
        while (rootPathNodes[0] === dirPathNodes[0]) {
            dirPathNodes.shift();
            rootPathNodes.shift();
        }
        return dirPathNodes.join('/');
    }
}

export default FileSystem;