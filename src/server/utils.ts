import database from './database';
import { ThingConfig } from '../thing';

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