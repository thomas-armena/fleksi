const getNodeConfigFromRelativePath = (nodeConfig, path) => {
    let currNode = nodeConfig.node;
    for (const key of path) {
        currNode = currNode[key];
        if (!currNode) {
            console.error(`key doesn't exist: ${key}`);
            return null;
        }
    }
    return {
        ...nodeConfig,
        path: [...nodeConfig.path, ...path],
        node: currNode
    }
}

export { getNodeConfigFromRelativePath };