import React from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { dragEditorWindow, stopDraggingEditorWindow } from '../../state/editorWindowSlice';
import CreatorWindow from '../CreatorWindow/CreatorWindow';

const ThingApp = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { authorMode, path } = useAppSelector((state) => state.context);
    const editorWindow = useAppSelector((state) => state.editorWindow);
    const creatorWindow = useAppSelector((state) => state.creatorWindow);

    return (
        <div className="page-container"
            onMouseMove={(e)=>{
                if (editorWindow.isDragging) {
                    dispatch(dragEditorWindow(e.clientX));
                }
            }}
            onMouseUp={()=>{
                dispatch(stopDraggingEditorWindow());
            }}
        >
            { authorMode && editorWindow.isOpen && <EditorWindow />}
            { authorMode && creatorWindow.isOpen && <CreatorWindow />}
            <div className="content">
                <ThingContainer path={path} />
            </div>
        </div>
    );
        
}

export default ThingApp;