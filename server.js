import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './src/build.js';
import { getFleksiNodes } from './src/dir.js';
import { WORKING_DIR, APP_DIR } from './src/constants.js';
import path from 'path';
import fs from 'fs';

const flexiNodes = await getFleksiNodes(path.join(WORKING_DIR, 'root'));
buildComponentLibrary();
buildRendererLibary();

const app = express();
app.use(express.static(path.join(WORKING_DIR,'build')));

app.get('*', function(req, res) {
    const fleksiNode = getFleksiNodeFromURL(req.url);
    const htmlResponse = generateHTML(fleksiNode);
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(htmlResponse));
});

const getFleksiNodeFromURL = (url) => {
    const urlNodes = url.split('/');
    urlNodes.splice(0,1)
    console.log('nodes:'+urlNodes);
    let currNode = {...flexiNodes};
    for(let urlNode of urlNodes) {
        const childNode = name(currNode, urlNode);
        if (childNode) {
            currNode = childNode;
        }
    }
    return currNode;
}

const name = (obj, name) => {
    if (!obj.children) {
        return null;
    }
    for (let child of obj.children) {
        if (child.name === name) {
            return child;
        }
    }
    return null;
}

const generateHTML = (fleksiNode) => {
    let templateHTML = fs.readFileSync(path.join(APP_DIR, 'template.html')).toString();
    templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(fleksiNode));
    return templateHTML;
}

app.listen(3000);
