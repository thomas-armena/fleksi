import React from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { dragEditorWindow, stopDraggingEditorWindow } from '../../state/editorWindowSlice';

const ThingApp = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { authorMode, path } = useAppSelector((state) => state.context);
    const editorWindow = useAppSelector((state) => state.editorWindow);

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
            <div className="content">
                <ThingContainer path={path} />
            </div>
        </div>
    );
        
}

export default ThingApp;