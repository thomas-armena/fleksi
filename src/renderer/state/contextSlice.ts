import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThingAppContext, PathNodes, ThingObject, Thing } from '../../utils/types';

export type EditThingPayload = {
    path: PathNodes,
    newValue: Thing
}

export interface ContextState {
    rootThing: ThingObject,
    authorMode: boolean,
    path: PathNodes,
    editorWindowOpen: boolean,
    editPath: PathNodes,
    synced: boolean
}

const initialState: ContextState = {
    rootThing: {},
    authorMode: false,
    path: [],
    editorWindowOpen: false,
    editPath: [],
    synced: true
}

export const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<ThingAppContext>) => {
            state.rootThing = action.payload.rootThing;
            state.authorMode = action.payload.authorMode;
            state.path = action.payload.path;
        },
        toggleEditorWindow: (state) => {
            state.editorWindowOpen = !state.editorWindowOpen;
        },
        startEdittingThing: (state, action: PayloadAction<PathNodes>) => {
            state.editorWindowOpen = true;
            state.editPath = action.payload;
        },
        editThing: (state, action: PayloadAction<EditThingPayload>) => {
            const { path, newValue } = action.payload;
            let currThing = state.rootThing as ThingObject;
            console.log(path, newValue);
            for (const node of path.slice(0,-1)) {
                if (node === "") continue;
                currThing = currThing[node] as ThingObject;
            }
            const key = path[path.length-1]
            console.log(key, newValue);
            currThing[key] = newValue;
            state.synced = false;
        }

    },
})

export const { init, toggleEditorWindow, startEdittingThing, editThing } = contextSlice.actions

export default contextSlice.reducer