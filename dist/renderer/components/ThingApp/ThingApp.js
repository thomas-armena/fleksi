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
require("./ThingApp.scss");
const ThingContainer_1 = __importDefault(require("../ThingContainer/ThingContainer"));
const EditorWindow_1 = __importDefault(require("../EditorWindow/EditorWindow"));
const react_redux_1 = require("react-redux");
const contextSlice_1 = require("../../state/contextSlice");
const ThingApp = ({ thingAppContext }) => {
    const dispatch = react_redux_1.useDispatch();
    const { authorMode, editorWindowOpen, path } = react_redux_1.useSelector((state) => state.context);
    react_1.useEffect(() => {
        dispatch(contextSlice_1.init(thingAppContext));
    }, []);
    return (react_1.default.createElement("div", { className: "page-container" },
        authorMode && editorWindowOpen && react_1.default.createElement(EditorWindow_1.default, null),
        react_1.default.createElement("div", { className: "content" },
            react_1.default.createElement(ThingContainer_1.default, { path: path }))));
};
exports.default = ThingApp;
//# sourceMappingURL=ThingApp.js.map