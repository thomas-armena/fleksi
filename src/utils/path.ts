import { Thing, ThingObject, PathNodes } from "./types"

export const getThingFromPath = (rootThing: Thing, path: PathNodes): Thing => {
    let currThing = rootThing;
    for (const key of path) {
        if (key === '') continue;
        currThing = (currThing as ThingObject)[key] as Thing;
        if (!currThing) {
            console.error(`key doesn't exist: ${key}`);
        }
    }
    return currThing;
}

export const getPathNodesFromURL = (path: string): PathNodes => {
    const nodes = path.split('/');

    return nodes
        .filter( node => node !== '')       // remove empty nodes
        .map( node => node.split('?')[0]);  // remove request params
}