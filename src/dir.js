import path from 'path';
import fs from 'fs';
import { opendir } from 'fs/promises';

const getFleksiNodes = async (dir) => {
    const baseName = path.basename(dir);
    let fNode = { name: baseName };
    const metaPath = path.join(dir, 'meta.json');
    if (fs.existsSync(metaPath)) {
        const meta = readJson(metaPath);
        fNode = { ...fNode, ...meta};
    }
    if (!fNode.component && isUppercase(baseName[0])) {
        fNode.component = baseName;
    };
    if (!fNode.children) fNode.children = await getChildren(dir);
    return fNode;
}

const getChildren = async (dirPath) => {
    let children = [];
    try {
        const dir = await opendir(dirPath);
        for await (const dirent of dir) {
            const childDir = path.join(dirPath, dirent.name)
            if (dirent.isDirectory()) {
                let childNodes = await getFleksiNodes(childDir);
                children.push(childNodes);
            }
        }
    } catch (err) {
        console.error(err);
    }
    children = sortByOrder(children);
    return children;
}

const readJson = (filePath) => {
    const rawdata = fs.readFileSync(filePath);
    return JSON.parse(rawdata);
}

const sortByOrder = (nodes) => {
    return nodes.sort((a, b) => {
        if (!b.order) return -1;
        if (!a.order) return 1; 
        return a.order - b.order;
    })
}

const isUppercase = char => {
    return char === char.toUpperCase();
}

export { getFleksiNodes }