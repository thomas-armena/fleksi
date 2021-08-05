import { WORKING_DIR } from '../utils/constants';
import { Thing, ThingObject } from '../utils/types';
import path from 'path';
import fs from 'fs';

const DEFAULT_ROOT = path.join(WORKING_DIR, 'initial');

class FileSystem {

    rootPath: string;

    constructor(rootPath = DEFAULT_ROOT) {
        this.rootPath = rootPath;
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
}

export default FileSystem;