"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const build_1 = require("./build");
const database_1 = __importDefault(require("./database"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("../utils/constants");
const path_2 = require("../utils/path");
const kinds_1 = require("../utils/kinds");
const startServer = () => {
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.use(express_1.default.static(path_1.default.join(constants_1.WORKING_DIR, 'build')));
    app.get('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const authorMode = req.query.author === 'true';
        const isRaw = req.query.raw === 'true';
        const thing = yield database_1.default.getThing(req.url);
        if (isRaw) {
            res.set('Content-Type', 'application/json');
            res.send(thing);
        }
        else if (typeof thing === 'object' && thing._kind === kinds_1.KIND.FILE) {
            res.set('Content-Type', 'image/png');
            database_1.default.getFileWriteStream(req.url.slice(1)).pipe(res);
        }
        else {
            const rootThing = yield database_1.default.getThing('/');
            const pathNodes = path_2.getPathNodesFromURL(req.url);
            const thingAppContext = {
                rootThing,
                authorMode,
                path: pathNodes
            };
            const htmlResponse = generateHTML(thingAppContext);
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(htmlResponse));
        }
    }));
    app.post('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const thingPostBody = req.body;
        const result = yield database_1.default.setThing(req.url, thingPostBody.set);
        res.send(result);
    }));
    const generateHTML = (thingAppContext) => {
        let templateHTML = fs_1.default.readFileSync(constants_1.PATH_TO_HTML_TEMPLATE).toString();
        templateHTML = templateHTML.replace(constants_1.THING_APP_REGEX, JSON.stringify(thingAppContext));
        return templateHTML;
    };
    app.listen(3000);
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.populateWithInitialData();
    yield build_1.buildComponentLibrary();
    yield build_1.buildRendererLibary();
    startServer();
});
start().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map