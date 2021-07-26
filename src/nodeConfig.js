import database from './database/index.js';

const getNodeConfig = async (url, shouldAuthor) => {
    const node = await database.getNode(url);
    const root = await database.getNode('/');
    const path = getPathNodesFromURL(url);
    const config = { node, shouldAuthor, url, root, path };
    return config;
}

const getPathNodesFromURL = (path) => {
    let nodes = path.split('/');

    return nodes
        .filter( node => node !== '')
        .map( node => node.split('?')[0]);
}

export { getNodeConfig, getPathNodesFromURL };