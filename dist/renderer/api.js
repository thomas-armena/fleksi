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
exports.fetchNode = exports.updateNode = void 0;
const axios_1 = __importDefault(require("axios"));
let updateCancelSource = null;
let getCancelSource = null;
const updateNode = (path, value) => __awaiter(void 0, void 0, void 0, function* () {
    const url = getUrlFromPathNodes(path);
    try {
        if (updateCancelSource != null) {
            updateCancelSource.cancel('Operation canceled');
        }
        updateCancelSource = axios_1.default.CancelToken.source();
        const response = yield axios_1.default.post(url, { set: value }, {
            headers: {
                'Content-Type': 'application/json'
            },
            cancelToken: updateCancelSource.token
        });
        return response;
    }
    catch (error) {
        console.error(error);
        return null;
    }
});
exports.updateNode = updateNode;
const fetchNode = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const url = getUrlFromPathNodes(path) + '?raw=true';
    try {
        if (getCancelSource != null) {
            getCancelSource.cancel('Operation canceled');
        }
        getCancelSource = axios_1.default.CancelToken.source();
        const response = yield axios_1.default.get(url, {
            cancelToken: getCancelSource.token,
        });
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
});
exports.fetchNode = fetchNode;
const getUrlFromPathNodes = (path) => {
    let url = path.join('/');
    if (url[0] != '/')
        url = '/' + url;
    return url;
};
//# sourceMappingURL=api.js.map