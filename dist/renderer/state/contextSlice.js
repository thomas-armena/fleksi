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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.editThingAndUpdate = exports.updateRootThing = exports.editThing = exports.startEdittingThing = exports.toggleEditorWindow = exports.init = exports.contextSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const api_1 = require("../api");
const initialState = {
    rootThing: {},
    authorMode: false,
    path: [],
    editorWindowOpen: false,
    editPath: [],
    synced: true
};
exports.contextSlice = toolkit_1.createSlice({
    name: 'context',
    initialState,
    reducers: {
        init: (state, action) => {
            state.rootThing = action.payload.rootThing;
            state.authorMode = action.payload.authorMode;
            state.path = action.payload.path;
        },
        toggleEditorWindow: (state) => {
            state.editorWindowOpen = !state.editorWindowOpen;
        },
        startEdittingThing: (state, action) => {
            state.editorWindowOpen = true;
            state.editPath = action.payload;
        },
        editThing: (state, action) => {
            const { path, newValue } = action.payload;
            let currThing = state.rootThing;
            console.log(path, newValue);
            for (const node of path.slice(0, -1)) {
                if (node === "")
                    continue;
                currThing = currThing[node];
            }
            const key = path[path.length - 1];
            console.log(key, newValue);
            currThing[key] = newValue;
            state.synced = false;
        },
        updateRootThing: (state, action) => {
            state.rootThing = action.payload;
            state.synced = true;
        }
    },
});
_a = exports.contextSlice.actions, exports.init = _a.init, exports.toggleEditorWindow = _a.toggleEditorWindow, exports.startEdittingThing = _a.startEdittingThing, exports.editThing = _a.editThing, exports.updateRootThing = _a.updateRootThing;
let updateCount = 1;
const editThingAndUpdate = (payload) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch(exports.editThing(payload));
        updateCount += 1;
        const currUpdateCount = updateCount;
        yield delay(3000);
        if (updateCount != currUpdateCount)
            return;
        try {
            yield api_1.updateNode(payload.path, payload.newValue);
            const rootThing = yield api_1.fetchNode([""]);
            dispatch(exports.updateRootThing(rootThing));
        }
        catch (error) {
            console.log('update failed');
            console.error(error);
        }
    });
};
exports.editThingAndUpdate = editThingAndUpdate;
const delay = (t) => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, t);
    });
};
exports.default = exports.contextSlice.reducer;
//# sourceMappingURL=contextSlice.js.map