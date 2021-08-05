"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const JsonEditor_1 = __importDefault(require("../JsonEditor/JsonEditor"));
const react_redux_1 = require("react-redux");
require("./EditorWindow.scss");
const EditorWindow = () => {
    const { path, synced } = react_redux_1.useSelector((state) => state.context);
    return (react_1.default.createElement("div", { className: "editor-window" },
        react_1.default.createElement("div", null, synced ? 'Up to date' : 'Saving...'),
        react_1.default.createElement(JsonEditor_1.default, { path: path })));
};
exports.default = EditorWindow;
//# sourceMappingURL=EditorWindow.js.map