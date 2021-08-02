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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const context_1 = require("../context");
const util_1 = require("../util");
const api_1 = require("../api");
const JsonEditor = ({ config }) => {
    const startingNode = config ? config.thing : null;
    const [edittedNode, setEdittedNode] = react_1.useState(startingNode);
    const { currEditPath, getNodeFromServer } = react_1.useContext(context_1.PageContext);
    if (!config) {
        return react_1.default.createElement("div", null, "undefined");
    }
    const isBeingEditted = arrEqual(currEditPath, config.path);
    const parentIsBeingEditted = arrIsSubset(currEditPath, config.path);
    const renderObject = () => {
        const json = edittedNode;
        if (!json) {
            return react_1.default.createElement("div", null, "undefined");
        }
        const childComponents = [];
        for (const key of Object.keys(json)) {
            const childConfig = util_1.getThingConfigFromRelativePath(config, [key]);
            childComponents.push(react_1.default.createElement(JsonEditor, { config: childConfig }));
        }
        return react_1.default.createElement("ul", null, childComponents);
    };
    const handleValueChange = (event) => __awaiter(void 0, void 0, void 0, function* () {
        setEdittedNode(event.target.value);
        yield api_1.updateNode(config.path, event.target.value);
        getNodeFromServer();
    });
    const renderValue = () => {
        const val = edittedNode;
        if (typeof val === 'object') {
            return renderObject();
        }
        else if (typeof val === 'string') {
            return react_1.default.createElement("span", null,
                '"',
                val,
                '"');
        }
        else {
            return react_1.default.createElement("span", null, val);
        }
    };
    const renderValueEditor = () => {
        const val = edittedNode;
        if (typeof val === 'object') {
            return renderObject();
        }
        else if (typeof val === 'string') {
            return react_1.default.createElement("input", { type: 'text', value: edittedNode, onChange: handleValueChange });
        }
        else {
            return react_1.default.createElement("span", null, val);
        }
    };
    const key = config.path[config.path.length - 1];
    return (react_1.default.createElement("li", { style: { background: isBeingEditted ? 'darkgray' : 'transparent' } },
        key,
        ": ",
        parentIsBeingEditted ? renderValueEditor() : renderValue()));
};
const arrEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i])
            return false;
    }
    return true;
};
const arrIsSubset = (arr1, arr2) => {
    if (arr1.length > arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i])
            return false;
    }
    return true;
};
exports.default = JsonEditor;
//# sourceMappingURL=JsonEditor.js.map