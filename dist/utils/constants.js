"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH_TO_HTML_TEMPLATE = exports.THING_APP_REGEX = exports.APP_DIR = exports.WORKING_DIR = void 0;
const path_1 = __importDefault(require("path"));
exports.WORKING_DIR = path_1.default.resolve(process.cwd());
exports.APP_DIR = path_1.default.resolve(__dirname);
exports.THING_APP_REGEX = '<thing-app>';
exports.PATH_TO_HTML_TEMPLATE = path_1.default.join(exports.APP_DIR, '..', '..', 'src', 'server', 'template.html');
//# sourceMappingURL=constants.js.map