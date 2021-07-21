import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './src/build.js';
import FlexiNodes from './src/flexiNodes.js';
import { WORKING_DIR, APP_DIR } from './src/constants.js';
import path from 'path';
import fs from 'fs';

const fleksiNodes = new FlexiNodes();
buildComponentLibrary();
buildRendererLibary();

const app = express();
app.use(express.static(path.join(WORKING_DIR,'build')));

app.get('*', (req, res) => {
    const fleksiNode = fleksiNodes.fromURL(req.url);
    const htmlResponse = generateHTML(fleksiNode);
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(htmlResponse));
});

const generateHTML = (fleksiNode) => {
    let templateHTML = fs.readFileSync(path.join(APP_DIR, 'template.html')).toString();
    templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(fleksiNode));
    return templateHTML;
}

app.listen(3000);
