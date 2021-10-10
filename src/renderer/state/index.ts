import { ActionCreatorWithOptionalPayload, ActionCreatorWithoutPayload, createSlice, Dispatch, PayloadAction, Slice, configureStore } from '@reduxjs/toolkit'
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
    synced: boolean,
}



const defaultInitialState: ContextState = {
    rootThing: {_kind: 'none'},
    authorMode: false,
    path: [],
    editorWindowOpen: false,
    editPath: [],
    synced: true,
}

class AppContext {
    contextSlice: Slice<ContextState>
    init: ActionCreatorWithOptionalPayload<ThingAppContext, string>
    toggleEditorWindow: ActionCreatorWithoutPayload<string>
    startEdittingThing: ActionCreatorWithOptionalPayload<PathNodes, string>
    editThing: ActionCreatorWithOptionalPayload<EditThingPayload, string>
    updateRootThing: ActionCreatorWithOptionalPayload<ThingObject, string>
    editThingAndUpdate: (payload: EditThingPayload) => (dispatch: Dispatch) => Promise<void>
    store: any

    updateCount: number
    
    constructor(initialState: ContextState = defaultInitialState) {
        this.setInitialState(initialState);
    }

    setInitialState(initialState: ContextState) {
        const slice = createSlice({
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
        this.contextSlice = slice;
        this.init = slice.actions.init;
        this.toggleEditorWindow = slice.actions.toggleEditorWindow;
        this.startEdittingThing = slice.actions.startEdittingThing;
        this.editThing = slice.actions.editThing;
        this.updateRootThing = slice.actions.updateRootThing;
        this.editThingAndUpdate = (payload: EditThingPayload) => {
            return async (dispatch: Dispatch): Promise<void> => {
                dispatch(this.editThing(payload));
                this.updateCount += 1;
                const currUpdateCount = this.updateCount;
                await delay(3000);
                if (this.updateCount != currUpdateCount) return;
                try {
                    await updateNode(payload.path, payload.newValue);
                    const rootThing = await fetchNode([""]) as ThingObject;
                    dispatch(this.updateRootThing(rootThing));
                } catch(error) {
                    console.log('update failed');
                    console.error(error);
                }
            }
        }

        this.store = configureStore({
            reducer: {
                context: slice.reducer
            },
        })
    }
}

const delay = (t: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(function() {
            resolve();
        }, t);
    });
}

const appContext = new AppContext();

export default appContext;

export type RootState = ReturnType<typeof appContext.store.getState>
export type AppDispatch = typeof appContext.store.dispatch


