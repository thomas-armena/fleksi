"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathNodesFromURL = exports.getThingFromPath = void 0;
const getThingFromPath = (rootThing, path) => {
    let currThing = rootThing;
    for (const key of path) {
        if (key === '')
            continue;
        currThing = currThing[key];
        if (!currThing) {
            console.error(`key doesn't exist: ${key}`);
        }
    }
    return currThing;
};
exports.getThingFromPath = getThingFromPath;
const getPathNodesFromURL = (path) => {
    const nodes = path.split('/');
    return nodes
        .filter(node => node !== '') // remove empty nodes
        .map(node => node.split('?')[0]); // remove request params
};
exports.getPathNodesFromURL = getPathNodesFromURL;
//# sourceMappingURL=path.js.map