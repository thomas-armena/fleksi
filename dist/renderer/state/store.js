"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const contextSlice_1 = __importDefault(require("./contextSlice"));
exports.store = toolkit_1.configureStore({
    reducer: {
        context: contextSlice_1.default
    },
});
//# sourceMappingURL=store.js.map