import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './build';
import database from './database';
import { WORKING_DIR, APP_DIR } from './constants';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { Thing, ThingConfig } from '../thing';
import { getThingConfig } from './utils';

interface ThingPostBody {
    set: Thing
}

const startServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(WORKING_DIR,'build')));

    app.get('*', async (req, res) => {
        const authorMode = req.query.author === 'true';
        const isRaw = req.query.raw === 'true';
        if (isRaw) {
            const node = await database.getThing(req.url);
            res.set('Content-Type', 'application/json');
            res.send(node);
        } else {
            console.log(getThingConfig);
            const thingConfig = await getThingConfig(req.url, authorMode);
            console.log(thingConfig);
            const htmlResponse = generateHTML(thingConfig);
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(htmlResponse));
        }
    });

    app.post('*', async (req, res) => {
        const thingPostBody = req.body as ThingPostBody;
        const result = await database.setThing(req.url, thingPostBody.set);
        res.send(result);
    });

    const generateHTML = (config: ThingConfig): string => {
        let templateHTML = fs.readFileSync(path.join(APP_DIR, '..', '..', 'src', 'server', 'template.html')).toString();
        templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(config));
        return templateHTML;
    }

    app.listen(3000);
}

const start = async () => {
    const result = await database.populateWithInitialData();
    await buildComponentLibrary();
    await buildRendererLibary();
    startServer();
}

start().catch((err)=>console.log(err));

