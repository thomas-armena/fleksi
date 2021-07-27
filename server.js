import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './src/build.js';
import database from './src/database/index.js';
import { WORKING_DIR, APP_DIR } from './src/constants.js';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { getNodeConfig } from './src/nodeConfig.js';

const startServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(WORKING_DIR,'build')));
    
    app.get('*', async (req, res) => {
        const shouldAuthor = req.query.author === 'true';
        const isRaw = req.query.raw === 'true';
        if (isRaw) {
            const node = await database.getNode(req.url, shouldAuthor);
            res.set('Content-Type', 'application/json');
            res.send(node);
            return
        }
        const nodeConfig = await getNodeConfig(req.url, shouldAuthor);
        const htmlResponse = generateHTML(nodeConfig);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(htmlResponse));
    });

    app.post('*', async (req, res) => {
        const node = req.body;
        const result = await database.setNode(req.url, node.set);
        res.send(result);
    });
    
    const generateHTML = (config) => {
        let templateHTML = fs.readFileSync(path.join(APP_DIR, 'template.html')).toString();
        templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(config));
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

