import express from 'express';
import { buildComponentLibrary, buildRendererLibary } from './build';
import database from './database';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import { Thing, ThingAppContext, ThingObject } from '../utils/types';
import { PATH_TO_HTML_TEMPLATE, THING_APP_REGEX, WORKING_DIR } from '../utils/constants';
import { getPathNodesFromURL } from '../utils/path';

interface ThingPostBody { set: Thing }

const startServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(express.static(path.join(WORKING_DIR,'build')));

    app.get('*', async (req, res) => {
        const authorMode = req.query.author === 'true';
        const isRaw = req.query.raw === 'true';
        if (isRaw) {
            res.set('Content-Type', 'application/json');
            const thing = await database.getThing(req.url);
            res.send(thing);
        } else {
            const rootThing = await database.getThing('/') as ThingObject;
            const pathNodes = getPathNodesFromURL(req.url);
            const thingAppContext: ThingAppContext = {
                rootThing,
                authorMode,
                path: pathNodes
            };
            const htmlResponse = generateHTML(thingAppContext);
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(htmlResponse));
        }
    });

    app.post('*', async (req, res) => {
        const thingPostBody = req.body as ThingPostBody;
        const result = await database.setThing(req.url, thingPostBody.set);
        res.send(result);
    });

    const generateHTML = (thingAppContext: ThingAppContext): string => {
        let templateHTML = fs.readFileSync(PATH_TO_HTML_TEMPLATE).toString();
        templateHTML = templateHTML.replace(THING_APP_REGEX, JSON.stringify(thingAppContext));
        return templateHTML;
    }

    app.listen(3000);
}

const start = async () => {
    await database.populateWithInitialData();
    await buildComponentLibrary()
    await buildRendererLibary()
    startServer();
}

start().catch((err)=>console.log(err));

