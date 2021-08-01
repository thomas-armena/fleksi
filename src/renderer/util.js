const getNodeConfigFromRelativePath = (nodeConfig, path) => {
    const node = getNodeFromRelativePath(nodeConfig.thing, path);
    return {
        ...nodeConfig,
        path: [...nodeConfig.path, ...path],
        relativePath: [...nodeConfig.relativePath, ...path],
        node: node
    }
}

const getNodeFromRelativePath = (node, path) => {
    let currNode = node;
    for (const key of path) {
        if (key === '') continue;
        currNode = currNode[key];
        if (!currNode) {
            console.error(`key doesn't exist: ${key}`);
        }
    }
    return currNode;
}

export { getNodeConfigFromRelativePath, getNodeFromRelativePath };