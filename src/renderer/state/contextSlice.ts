import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { ThingAppContext, PathNodes, ThingObject, Thing } from '../../utils/types';
import { fetchNode, updateNode } from '../api';

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
    rootThing: {_kind: 'none'},
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
            for (const node of path.slice(0,-1)) {
                if (node === "") continue;
                currThing = currThing[node] as ThingObject;
            }
            const key = path[path.length-1]
            currThing[key] = newValue;
            state.synced = false;
        },
        updateRootThing: (state, action: PayloadAction<ThingObject>) => {
            state.rootThing = action.payload;
            state.synced = true;
        }
    },
})

export const { init, toggleEditorWindow, startEdittingThing, editThing, updateRootThing } = contextSlice.actions;

let updateCount = 1;
export const editThingAndUpdate = (payload: EditThingPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(editThing(payload));
        updateCount += 1;
        const currUpdateCount = updateCount;
        await delay(3000);
        if (updateCount != currUpdateCount) return;
        try {
            await updateNode(payload.path, payload.newValue);
            const rootThing = await fetchNode([""]) as ThingObject;
            dispatch(updateRootThing(rootThing));
        } catch(error) {
            console.log('update failed');
            console.error(error);
        }
    }
}

const delay = (t: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve();
        }, t);
    });
 }

export default contextSlice.reducer