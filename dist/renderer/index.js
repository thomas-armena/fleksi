"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNodeToDOM = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const PageContainer_1 = __importDefault(require("./PageContainer/PageContainer"));
const renderNodeToDOM = (config) => {
    const domContainer = document.querySelector('#root');
    react_dom_1.default.render(react_1.default.createElement(PageContainer_1.default, { config: config }), domContainer);
};
exports.renderNodeToDOM = renderNodeToDOM;
//# sourceMappingURL=index.js.map