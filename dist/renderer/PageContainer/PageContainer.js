"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
require("./PageContainer.scss");
const ThingContainer_1 = __importDefault(require("../ThingContainer/ThingContainer"));
const EditorWindow_1 = __importDefault(require("../EditorWindow/EditorWindow"));
const api_1 = require("../api");
const context_1 = require("../context");
const PageContainer = ({ config }) => {
    const [shouldShowEditor, setShouldShowEditor] = react_1.useState(false);
    const [currEditPath, setCurrEditPath] = react_1.useState([]);
    const [currNode, setCurrNode] = react_1.useState(config.thing);
    const getNodeFromServer = () => __awaiter(void 0, void 0, void 0, function* () {
        const newNode = yield api_1.getNode(config.path);
        if (newNode)
            setCurrNode(newNode);
    });
    return (react_1.default.createElement(context_1.PageContext.Provider, { value: { shouldShowEditor, setShouldShowEditor, currEditPath,
            setCurrEditPath, currNode, getNodeFromServer } },
        react_1.default.createElement("div", { className: "page-container" },
            config.authorMode && shouldShowEditor && react_1.default.createElement(EditorWindow_1.default, { config: config }),
            react_1.default.createElement("div", { className: "content" },
                react_1.default.createElement(ThingContainer_1.default, { config: config })))));
};
exports.default = PageContainer;
//# sourceMappingURL=PageContainer.js.map