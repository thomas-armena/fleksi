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
    editPath: PathNodes,
    synced: boolean,

    editorWindowOpen: boolean,
    editorWindowWidth: number,
    editorWindowIsDragging: boolean,

    editorWindowDragStartWidth: number,
    editorWindowDragStartPosition: number,

    revealMap: { [key: string]: boolean }

}

const defaultThingAppContext: ThingAppContext = {
    rootThing: {_kind: 'none'},
    authorMode: false,
    path: [],
    kinds: {},
    templates: {}
}

class AppContext {
    contextSlice: Slice<ContextState>
    init: ActionCreatorWithOptionalPayload<ThingAppContext, string>
    toggleEditorWindow: ActionCreatorWithoutPayload<string>
    startEdittingThing: ActionCreatorWithOptionalPayload<PathNodes, string>
    editThing: ActionCreatorWithOptionalPayload<EditThingPayload, string>
    updateRootThing: ActionCreatorWithOptionalPayload<ThingObject, string>
    start: ActionCreatorWithOptionalPayload<ThingObject, string>
    startDraggingEditorWindow: ActionCreatorWithOptionalPayload<number, string>
    dragEditorWindow: ActionCreatorWithOptionalPayload<number, string>
    stopDraggingEditorWindow: ActionCreatorWithoutPayload<string>
    closeEditorWindow: ActionCreatorWithoutPayload<string>
    revealThing: ActionCreatorWithOptionalPayload<PathNodes, string>
    hideThing: ActionCreatorWithOptionalPayload<PathNodes, string>

    editThingAndUpdate: (payload: EditThingPayload) => (dispatch: Dispatch) => Promise<void>
    store: any

    updateCount: number
    
    constructor(thingAppContext: ThingAppContext = defaultThingAppContext) {
        this.setInitialState(thingAppContext);
        this.updateCount = 0;
    }

    setInitialState(thingAppContext: ThingAppContext) {

        const initialState: ContextState = {
            rootThing: thingAppContext.rootThing,
            authorMode: thingAppContext.authorMode,
            path: thingAppContext.path,

            editPath: [],
            synced: true,

            editorWindowOpen: false,
            editorWindowWidth: 400,
            editorWindowIsDragging: false,

            editorWindowDragStartWidth: -1,
            editorWindowDragStartPosition: -1,

            revealMap: {}

        }

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

                    let rollingPath = [];
                    for (let pathNode of action.payload) {
                        rollingPath.push(pathNode);
                        const key = rollingPath.join("/");
                        state.revealMap[key] = true;
                    }
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
                },
                startDraggingEditorWindow: (state, action: PayloadAction<number>) => {
                    state.editorWindowDragStartWidth = state.editorWindowWidth;
                    state.editorWindowDragStartPosition = action.payload;
                    state.editorWindowIsDragging = true;
                },
                dragEditorWindow: (state, action: PayloadAction<number>) => {
                    const currentMousePosition = action.payload;
                    const dragDelta = currentMousePosition - state.editorWindowDragStartPosition;
                    state.editorWindowWidth = Math.max(200, state.editorWindowDragStartWidth + dragDelta);
                },
                stopDraggingEditorWindow: (state) => {
                    state.editorWindowIsDragging = false;
                },
                closeEditorWindow: (state) => {
                    state.editorWindowOpen = false;
                },
                revealThing: (state, action: PayloadAction<PathNodes>) => {
                    const key = action.payload.join("/");
                    state.revealMap[key] = true;
                },
                hideThing: (state, action: PayloadAction<PathNodes>) => {
                    const key = action.payload.join("/");
                    state.revealMap[key] = false;
                },            
            },
        })
        this.contextSlice = slice;
        this.init = slice.actions.init;
        this.toggleEditorWindow = slice.actions.toggleEditorWindow;
        this.startEdittingThing = slice.actions.startEdittingThing;
        this.editThing = slice.actions.editThing;
        this.updateRootThing = slice.actions.updateRootThing;
        this.startDraggingEditorWindow = slice.actions.startDraggingEditorWindow;
        this.dragEditorWindow = slice.actions.dragEditorWindow;
        this.stopDraggingEditorWindow = slice.actions.stopDraggingEditorWindow;
        this.closeEditorWindow = slice.actions.closeEditorWindow;
        this.revealThing = slice.actions.revealThing;
        this.hideThing = slice.actions.hideThing;

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


