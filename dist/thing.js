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
exports.getPathNodesFromURL = exports.getThingConfig = void 0;
const database_1 = __importDefault(require("./database"));
const getThingConfig = (url, authorMode) => __awaiter(void 0, void 0, void 0, function* () {
    const thing = yield database_1.default.getThing(url);
    const rootThing = yield database_1.default.getThing('/');
    const path = getPathNodesFromURL(url);
    const relativePath = [];
    const config = { thing, rootThing, authorMode, url, path, relativePath };
    return config;
});
exports.getThingConfig = getThingConfig;
const getPathNodesFromURL = (path) => {
    const nodes = path.split('/');
    return nodes
        .filter(node => node !== '')
        .map(node => node.split('?')[0]);
};
exports.getPathNodesFromURL = getPathNodesFromURL;
//# sourceMappingURL=thing.js.map