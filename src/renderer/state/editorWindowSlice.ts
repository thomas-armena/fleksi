import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PathNodes } from '../../utils/types';

interface EditorWindowState {
    editPath: PathNodes;
    isOpen: boolean;
    width: number;
    isDragging: boolean;
    dragStartWidth: number;
    dragCursorStartPosition: number;
    revealMap: { [key: string]: boolean };
}

const initialState: EditorWindowState = {
    editPath: [],
    isOpen: false,
    width: 300,
    isDragging: false,
    dragStartWidth: 300,
    dragCursorStartPosition: 0,
    revealMap: {},
};

const editorWindowSlice = createSlice({
    name: 'editorWindow',
    initialState: initialState,
    reducers: {
        openEditorWindow: (state) => {
            state.isOpen = true;
        },
        closeEditorWindow: (state) => {
            state.isOpen = false;
        },
        focusOnThing: (state, action: PayloadAction<PathNodes>) => {
            state.isOpen = true;
            state.editPath = action.payload;

            let rollingPath = [];
            for (let pathNode of action.payload) {
                rollingPath.push(pathNode);
                const key = rollingPath.join('/');
                state.revealMap[key] = true;
            }
        },
        startDraggingEditorWindow: (state, action: PayloadAction<number>) => {
            state.dragStartWidth = state.width;
            state.dragCursorStartPosition = action.payload;
            state.isDragging = true;
        },
        dragEditorWindow: (state, action: PayloadAction<number>) => {
            const currentMousePosition = action.payload;
            const dragDelta =
                currentMousePosition - state.dragCursorStartPosition;
            state.width = Math.max(200, state.dragStartWidth + dragDelta);
        },
        stopDraggingEditorWindow: (state) => {
            state.isDragging = false;
        },
        revealThing: (state, action: PayloadAction<PathNodes>) => {
            state.editPath = action.payload;
            const key = action.payload.join('/');
            state.revealMap[key] = true;
        },
        hideThing: (state, action: PayloadAction<PathNodes>) => {
            const key = action.payload.join('/');
            state.revealMap[key] = false;
        },
    },
});

export const {
    openEditorWindow,
    closeEditorWindow,
    focusOnThing,
    startDraggingEditorWindow,
    dragEditorWindow,
    stopDraggingEditorWindow,
    revealThing,
    hideThing,
} = editorWindowSlice.actions;

export default editorWindowSlice;