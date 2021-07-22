import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './src/build.js';
import Database from './src/database/index.js';
import { WORKING_DIR, APP_DIR } from './src/constants.js';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';

const database = new Database();

const startServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(WORKING_DIR,'build')));
    
    app.get('*', async (req, res) => {
        const node = await database.getNode(req.url);
        const htmlResponse = generateHTML(node);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(htmlResponse));
    });

    app.post('*', async (req, res) => {
        const node = req.body;
        const result = await database.setNode(req.url, node.set);
        console.log(result);
        res.send(result);
    });
    
    const generateHTML = (fleksiNode) => {
        let templateHTML = fs.readFileSync(path.join(APP_DIR, 'template.html')).toString();
        templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(fleksiNode));
        return templateHTML;
    }
    
    app.listen(3000);
}

const start = async () => {
    const result = await database.populateWithInitialData();
    console.log(await buildComponentLibrary());
    console.log(await buildRendererLibary());
    startServer();
}

start().catch((err)=>console.log(err));

