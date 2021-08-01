import { ThingConfig, Thing, ThingObject } from "../thing";

const getThingConfigFromRelativePath = (thingConfig: ThingConfig, path: string[]): ThingConfig => {
    const thing = getThingFromRelativePath(thingConfig.thing, path);
    return {
        ...thingConfig,
        path: [...thingConfig.path, ...path],
        relativePath: [...thingConfig.relativePath, ...path],
        thing: thing
    }
}

const getThingFromRelativePath = (thing: Thing, path: string[]): Thing => {
    let currThing = thing;
    for (const key of path) {
        if (key === '') continue;
        currThing = (currThing as ThingObject)[key];
        if (!currThing) {
            console.error(`key doesn't exist: ${key}`);
        }
    }
    return currThing;
}

export { getThingConfigFromRelativePath, getThingFromRelativePath };