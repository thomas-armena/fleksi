"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const JsonEditor_1 = __importDefault(require("../JsonEditor/JsonEditor"));
require("./EditorWindow.scss");
const EditorWindow = ({ config }) => {
    return (react_1.default.createElement("div", { className: "editor-window" },
        react_1.default.createElement(JsonEditor_1.default, { config: config })));
};
exports.default = EditorWindow;
//# sourceMappingURL=EditorWindow.js.map