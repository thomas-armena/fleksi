import express from 'express'
import database from './database'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import { Thing, ThingAppContext, ThingObject } from '../utils/types'
import {
    APP_DIR,
    PATH_TO_HTML_TEMPLATE,
    THING_APP_CONTEXT_REGEX,
    THING_APP_REGEX,
} from '../utils/constants'
import { getPathNodesFromURL, getThingFromPath } from '../utils/path'
import Kinds, { KIND } from '../utils/kinds'
import { renderNodeToString } from '../renderer/server'
import componentLib from '../utils/componentLib'
import { logFull } from '../utils/logging'

const kinds = new Kinds()

interface ThingPostBody {
    set: Thing
}

const startServer = () => {
    const app = express()
    const clientFolder = path.join(APP_DIR, '..', 'build-client')
    console.log('serving folder', clientFolder)

    app.use(bodyParser.json())
    app.use(express.static(clientFolder))

    app.get('*', async (req, res) => {
        const authorMode = req.query.author === 'true'
        const isRaw = req.query.raw === 'true'
        const thing = await database.getThing(req.url)
        if (isRaw) {
            res.set('Content-Type', 'application/json')
            res.send(thing)
        } else if (
            typeof thing === 'object' &&
            (thing as ThingObject)._kind === KIND.FILE
        ) {
            res.set('Content-Type', 'image/png')
            database.getFileWriteStream(req.url.slice(1)).pipe(res)
        } else {
            const rootThing = (await database.getThing('/')) as ThingObject
            const pathNodes = getPathNodesFromURL(req.url)
            if (getThingFromPath(rootThing, pathNodes) == null) {
                return
            }
            const thingAppContext: ThingAppContext = {
                rootThing,
                authorMode,
                path: pathNodes,
                kinds: kinds.kindDefinitions,
                templates: kinds.createAllTemplates(),
            }
            const htmlResponse = generateHTML(thingAppContext)
            res.set('Content-Type', 'text/html')
            res.send(Buffer.from(htmlResponse))
        }
    })

    app.post('*', async (req, res) => {
        const thingPostBody = req.body as ThingPostBody
        const result = await database.setThing(req.url, thingPostBody.set)
        res.send(result)
    })

    const generateHTML = (thingAppContext: ThingAppContext): string => {
        let templateHTML = fs.readFileSync(PATH_TO_HTML_TEMPLATE).toString()
        templateHTML = templateHTML.replace(
            THING_APP_REGEX,
            renderNodeToString(thingAppContext)
        )
        templateHTML = templateHTML.replace(
            THING_APP_CONTEXT_REGEX,
            JSON.stringify(thingAppContext)
        )
        console.log(templateHTML)
        return templateHTML
    }

    app.listen(3000)
}

const start = async () => {
    kinds.addComponentLibrary(componentLib)
    await database.populateWithInitialData()
    startServer()
    const rootThing = await database.getThing('/')
    logFull(kinds.kindDefinitions);
    logFull(rootThing);
    console.log('server started')
}

start().catch((err) => console.log(err))
