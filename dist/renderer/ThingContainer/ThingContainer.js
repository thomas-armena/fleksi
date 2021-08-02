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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./ThingContainer.scss");
const context_1 = require("../context");
const util_1 = require("../util");
const componentlib_1 = __importDefault(require("../componentlib"));
const ThingContainer = ({ config }) => {
    const [hover, setHover] = react_1.useState(false);
    const { setShouldShowEditor, currNode, setCurrEditPath } = react_1.useContext(context_1.PageContext);
    const thing = util_1.getThingFromRelativePath(currNode, config.relativePath);
    if (!thing)
        return react_1.default.createElement("div", null, "undefined");
    const renderChildren = () => {
        const thingObject = thing;
        const childComponents = [];
        for (const child of Object.keys(thingObject._children)) {
            const childNodeConfig = util_1.getThingConfigFromRelativePath(config, ['_children', child]);
            childComponents.push(react_1.default.createElement(ThingContainer, { config: childNodeConfig }));
        }
        return childComponents;
    };
    const Component = componentlib_1.default[thing._kind];
    if (!Component)
        return react_1.default.createElement("div", null, JSON.stringify(thing));
    const handleAuthorClick = (event) => {
        if (!config.authorMode)
            return;
        setShouldShowEditor(true);
        setCurrEditPath(config.path);
        event.stopPropagation();
    };
    const handleMouseOver = (event) => {
        if (!config.authorMode)
            return;
        setHover(true);
        event.stopPropagation();
    };
    const handleMouseOut = () => {
        setHover(false);
    };
    return (react_1.default.createElement("div", { onClick: handleAuthorClick, className: hover ? 'highlight' : '', onMouseOver: handleMouseOver, onMouseOut: handleMouseOut },
        react_1.default.createElement(Component, Object.assign({}, thing._arguments, { config: config }), thing._children && renderChildren())));
};
exports.default = ThingContainer;
//# sourceMappingURL=ThingContainer.js.map