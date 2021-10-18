import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import { ThingAppContext } from '../../utils/types';
import contextSlice, { ContextState } from './contextSlice';
import creatorWindowSlice from './creatorWindowSlice';
import editorWindowSlice from './editorWindowSlice';

const reducer = {
    context: contextSlice.reducer,
    editorWindow: editorWindowSlice.reducer,
    creatorWindow: creatorWindowSlice.reducer,
};

export const createStoreFromContext = (thingAppContext: ThingAppContext) => {
    const initialContextState: ContextState = {
        rootThing: thingAppContext.rootThing,
        authorMode: thingAppContext.authorMode,
        path: thingAppContext.path,
        kinds: thingAppContext.kinds,
        templates: thingAppContext.templates,
        synced: true,
    };

    return configureStore({
        reducer,
        preloadedState: {
            context: initialContextState,
        },
    });
};

type Store = ReturnType<typeof createStoreFromContext>;
export type RootState = StateFromReducersMapObject<typeof reducer>;
export type AppDispatch = Store['dispatch'];
