import database from './database';

export interface ThingObject {
    _kind?: string,
    _arguments?: ThingObject,
    _children?: ThingObject[],
    _isRoot?: boolean,
    [key: string]: Thing,
}

export interface ThingConfig {
    thing: Thing,
    rootThing: Thing,
    authorMode: boolean,
    url: string,
    path: string[],
    relativePath: string[]
}

export type Thing = ThingObject | string | number | boolean | Thing[];

const getThingConfig = async (url: string, authorMode: boolean): Promise<ThingConfig> => {
    const thing = await database.getThing(url);
    const rootThing = await database.getThing('/');
    const path = getPathNodesFromURL(url);
    const relativePath: string[] = [];
    const config = { thing, rootThing, authorMode, url,  path, relativePath };
    return config;
}

const getPathNodesFromURL = (path: string): string[] => {
    const nodes = path.split('/');

    return nodes
        .filter( node => node !== '')
        .map( node => node.split('?')[0]);
}

export { getThingConfig, getPathNodesFromURL };