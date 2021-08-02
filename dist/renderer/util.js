"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThingFromRelativePath = exports.getThingConfigFromRelativePath = void 0;
const getThingConfigFromRelativePath = (thingConfig, path) => {
    const thing = getThingFromRelativePath(thingConfig.thing, path);
    return Object.assign(Object.assign({}, thingConfig), { path: [...thingConfig.path, ...path], relativePath: [...thingConfig.relativePath, ...path], thing: thing });
};
exports.getThingConfigFromRelativePath = getThingConfigFromRelativePath;
const getThingFromRelativePath = (thing, path) => {
    let currThing = thing;
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
exports.getThingFromRelativePath = getThingFromRelativePath;
//# sourceMappingURL=util.js.map