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
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const startServer = () => {
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.use(express_1.default.static(path_1.default.join(constants_1.WORKING_DIR, 'build')));
    app.get('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const authorMode = req.query.author === 'true';
        const isRaw = req.query.raw === 'true';
        if (isRaw) {
            const node = yield database_1.default.getThing(req.url);
            res.set('Content-Type', 'application/json');
            res.send(node);
        }
        else {
            console.log(utils_1.getThingConfig);
            const thingConfig = yield utils_1.getThingConfig(req.url, authorMode);
            console.log(thingConfig);
            const htmlResponse = generateHTML(thingConfig);
            res.set('Content-Type', 'text/html');
            res.send(Buffer.from(htmlResponse));
        }
    }));
    app.post('*', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const thingPostBody = req.body;
        const result = yield database_1.default.setThing(req.url, thingPostBody.set);
        res.send(result);
    }));
    const generateHTML = (config) => {
        let templateHTML = fs_1.default.readFileSync(path_1.default.join(constants_1.APP_DIR, '..', '..', 'src', 'server', 'template.html')).toString();
        templateHTML = templateHTML.replace("<fleksiNode>", JSON.stringify(config));
        return templateHTML;
    };
    app.listen(3000);
};
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield database_1.default.populateWithInitialData();
    console.log(yield build_1.buildComponentLibrary());
    console.log(yield build_1.buildRendererLibary());
    startServer();
});
start().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map