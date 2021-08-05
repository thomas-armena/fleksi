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
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const path_1 = require("../../../utils/path");
const contextSlice_1 = require("../../state/contextSlice");
const JsonEditor = ({ path }) => {
    const dispatch = react_redux_1.useDispatch();
    const { rootThing, editPath } = react_redux_1.useSelector((state) => state.context);
    const thing = path_1.getThingFromPath(rootThing, path);
    const isBeingEditted = arrEqual(editPath, path);
    const parentIsBeingEditted = arrIsSubset(editPath, path);
    const renderObject = () => {
        const childComponents = [];
        for (const key of Object.keys(thing)) {
            const childPath = [...path, key];
            childComponents.push(react_1.default.createElement(JsonEditor, { path: childPath }));
        }
        return react_1.default.createElement("ul", null, childComponents);
    };
    const handleValueChange = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const newValue = event.target.value;
        dispatch(contextSlice_1.editThingAndUpdate({ path, newValue }));
    });
    const renderValue = () => {
        if (typeof thing === 'object') {
            return renderObject();
        }
        else if (typeof thing === 'string') {
            return react_1.default.createElement("span", null,
                '"',
                thing,
                '"');
        }
        else {
            return react_1.default.createElement("span", null, thing);
        }
    };
    const renderValueEditor = () => {
        if (typeof thing === 'object') {
            return renderObject();
        }
        else if (typeof thing === 'string') {
            return react_1.default.createElement("input", { type: 'text', value: thing, onChange: handleValueChange });
        }
        else {
            return react_1.default.createElement("span", null, thing);
        }
    };
    const key = path[path.length - 1];
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