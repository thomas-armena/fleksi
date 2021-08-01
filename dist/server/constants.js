"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_DIR = exports.WORKING_DIR = void 0;
const path_1 = __importDefault(require("path"));
const WORKING_DIR = path_1.default.resolve(process.cwd());
exports.WORKING_DIR = WORKING_DIR;
const APP_DIR = path_1.default.resolve(__dirname);
exports.APP_DIR = APP_DIR;
console.log(`Working directory: ${WORKING_DIR}`);
console.log(`App directory: ${APP_DIR}`);
//# sourceMappingURL=constants.js.map