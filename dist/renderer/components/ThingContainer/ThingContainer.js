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
const path_1 = require("../../../utils/path");
const componentlib_1 = __importDefault(require("../../componentlib"));
const react_redux_1 = require("react-redux");
const contextSlice_1 = require("../../state/contextSlice");
const ThingContainer = ({ path }) => {
    const dispatch = react_redux_1.useDispatch();
    const [hover, setHover] = react_1.useState(false);
    const { rootThing, authorMode } = react_redux_1.useSelector((state) => state.context);
    const thing = path_1.getThingFromPath(rootThing, path);
    if (!thing)
        return react_1.default.createElement("div", null, "undefined");
    const renderChildren = () => {
        const thingObject = thing;
        const childComponents = [];
        for (const child of Object.keys(thingObject._children)) {
            const childPath = [...path, '_children', child];
            childComponents.push(react_1.default.createElement(ThingContainer, { path: childPath }));
        }
        return childComponents;
    };
    const Component = componentlib_1.default[thing._kind];
    if (!Component)
        return react_1.default.createElement("div", null, JSON.stringify(thing));
    const handleAuthorClick = (event) => {
        if (!authorMode)
            return;
        dispatch(contextSlice_1.startEdittingThing(path));
        event.stopPropagation();
    };
    const handleMouseOver = (event) => {
        if (!authorMode)
            return;
        setHover(true);
        event.stopPropagation();
    };
    const handleMouseOut = () => {
        setHover(false);
    };
    const thingComponent = { thing, authorMode, path };
    return (react_1.default.createElement("div", { onClick: handleAuthorClick, className: hover ? 'highlight' : '', onMouseOver: handleMouseOver, onMouseOut: handleMouseOut },
        react_1.default.createElement(Component, Object.assign({}, thing._arguments, { thingComponent: thingComponent }), thing._children && renderChildren())));
};
exports.default = ThingContainer;
//# sourceMappingURL=ThingContainer.js.map