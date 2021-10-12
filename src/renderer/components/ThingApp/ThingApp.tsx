import React from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { useSelector, useDispatch } from 'react-redux'
import appContext, { RootState } from '../../state';

const ThingApp = (): JSX.Element => {
    const dispatch = useDispatch();
    const { authorMode, editorWindowOpen, path, editorWindowIsDragging } = useSelector((state: RootState) => state.context);

    return (
        <div className="page-container"
            onMouseMove={(e)=>{
                if (editorWindowIsDragging) {
                    dispatch(appContext.dragEditorWindow(e.clientX));
                }
            }}
            onMouseUp={()=>{
                dispatch(appContext.stopDraggingEditorWindow());
            }}
        >
            { authorMode && editorWindowOpen && <EditorWindow />}
            <div className="content">
                <ThingContainer path={path} />
            </div>
        </div>
    );
        
}

export default ThingApp;