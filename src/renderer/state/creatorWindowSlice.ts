import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathNodes } from '../../utils/types';
import { finishCreatingThing } from './actions';

interface CreatorWindowState {
    creationPath: PathNodes;
    isOpen: boolean;
    isLoading: boolean;
    name: string;
    kind: string;
}

const initialState: CreatorWindowState = {
    creationPath: [],
    isOpen: false,
    isLoading: false,
    name: '',
    kind: '',
};

const creatorWindowSlice = createSlice({
    name: 'creatorWindow',
    initialState: initialState,
    reducers: {
        openCreatorWindow: (state, action: PayloadAction<PathNodes>) => {
            state.creationPath = action.payload;
            state.isOpen = true;
            state.isLoading = false;
            state.name = '';
            state.kind = '';
        },
        closeCreatorWindow: (state) => {
            if (state.isLoading) return;
            state.isOpen = false;
        },
        editNameOfNewThing: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        editKindOfNewThing: (state, action: PayloadAction<string>) => {
            state.kind = action.payload;
        },
        submitNewThing: (state) => {
            state.isLoading = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(finishCreatingThing, (state) => {
            state.isLoading = false;
            state.isOpen = false;
        });
    },
});

export const {
    openCreatorWindow,
    closeCreatorWindow,
    editNameOfNewThing,
    editKindOfNewThing,
    submitNewThing,
} = creatorWindowSlice.actions;

export default creatorWindowSlice;
