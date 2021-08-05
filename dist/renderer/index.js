"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderNodeToDOM = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const ThingApp_1 = __importDefault(require("./components/ThingApp/ThingApp"));
const store_1 = require("./state/store");
const react_redux_1 = require("react-redux");
const renderNodeToDOM = (thingAppContext) => {
    const domContainer = document.querySelector('#root');
    react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
        react_1.default.createElement(ThingApp_1.default, { thingAppContext: thingAppContext })), domContainer);
};
exports.renderNodeToDOM = renderNodeToDOM;
//# sourceMappingURL=index.js.map