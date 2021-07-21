import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './src/build.js';
import FileSystem from './src/filesystem/index.js';
import Database from './src/database/index.js';
import { WORKING_DIR, APP_DIR } from './src/constants.js';
import path from 'path';
import fs from 'fs';


const initiateDatabase = async () => {
    const database = new Database();
    try {
        await database.connect();
        const result = await database.populateWithInitialData();
        console.log(result);
    } finally {
        await database.close();
    }
}

const build = () => {
    buildComponentLibrary();
    buildRendererLibary();
}
const startServer = () => {
    const app = express();
    app.use(express.static(path.join(WORKING_DIR,'build')));
    
    app.get('*', (req, res) => {
        const fileSystem = new FileSystem();
        const nodeFromURL = fileSystem.getNodeFromURL(req.url);
        const htmlResponse = generateHTML(nodeFromURL);
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(htmlResponse));
    });
    
    const generateHTML = (fleksiNode) => {
        let templateHTML = fs.readFileSync(path.join(APP_DIR, 'template.html')).toString();
        templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(fleksiNode));
        return templateHTML;
    }
    
    app.listen(3000);
}

initiateDatabase();

