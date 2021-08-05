"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.editThing = exports.startEdittingThing = exports.toggleEditorWindow = exports.init = exports.contextSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
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
        }
    },
});
_a = exports.contextSlice.actions, exports.init = _a.init, exports.toggleEditorWindow = _a.toggleEditorWindow, exports.startEdittingThing = _a.startEdittingThing, exports.editThing = _a.editThing;
exports.default = exports.contextSlice.reducer;
//# sourceMappingURL=contextSlice.js.map