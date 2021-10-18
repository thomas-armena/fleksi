import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { KindDefinitionMap, TemplateMap } from '../../utils/kinds';
import { PathNodes, Thing, ThingObject } from '../../utils/types';
import { fetchNode, updateNode } from '../api';

export interface ContextState {
    rootThing: ThingObject;
    authorMode: boolean;
    path: PathNodes;
    templates: TemplateMap;
    kinds: KindDefinitionMap;
    synced: boolean;
}

type EditThingPayload = {
    path: PathNodes;
    newValue: Thing;
};

// Note: This initial state will be overwritten by preloaded state
const initialState: ContextState = { 
    rootThing: {},
    authorMode: false,
    path: [],
    templates: {},
    kinds: {},
    synced: false,
};

const contextSlice = createSlice({
    name: 'context',
    initialState,
    reducers: {
        editThing: (state, action: PayloadAction<EditThingPayload>) => {
            const { path, newValue } = action.payload;
            let currThing = state.rootThing as ThingObject;
            for (const node of path.slice(0, -1)) {
                if (node === '') continue;
                currThing = currThing[node] as ThingObject;
            }
            const key = path[path.length - 1];
            currThing[key] = newValue;
            state.synced = false;
        },
        finishRefetchingRootThing: (state, action: PayloadAction<ThingObject>) => {
            state.rootThing = action.payload;
            state.synced = true;
        }
    }, 
})

export const { editThing, finishRefetchingRootThing } = contextSlice.actions;

let updateCount = 1;
export const editThingAndRefetch = (payload: EditThingPayload) => {
    return async (dispatch: Dispatch): Promise<void> => {
        dispatch(editThing(payload));
        updateCount += 1;
        const currUpdateCount = updateCount;
        await delay(3000);
        if (updateCount != currUpdateCount) return;
        try {
            await updateNode(payload.path, payload.newValue);
            const rootThing = (await fetchNode([''])) as ThingObject;
            dispatch(finishRefetchingRootThing(rootThing));
        } catch (error) {
            console.error(error);
        }
    };
};

const delay = (t: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(function () {
            resolve();
        }, t);
    });
};

export default contextSlice;
