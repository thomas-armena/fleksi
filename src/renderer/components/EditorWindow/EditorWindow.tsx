import React, { useState, useEffect } from 'react';
import JsonEditor from '../JsonEditor/JsonEditor';
import  './EditorWindow.scss';
import { closeEditorWindow, startDraggingEditorWindow } from '../../state/editorWindowSlice';
import { useAppSelector, useAppDispatch } from '../../state/hooks';

const EditorWindow = (): JSX.Element => {
    const { path, synced } = useAppSelector((state) => state.context);
    const { width } = useAppSelector((state) => state.editorWindow);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="editor-window" style={{width:`${width}px`}}>
                <div className="editor-content">
                    <div className="save-status">{synced ? 'Up to date' : 'Saving...'}</div>
                    <JsonEditor path={path} />
                </div>
                <div className="editor-drag"
                    onMouseDown={(e)=>{
                        dispatch(startDraggingEditorWindow(e.clientX));
                    }}
                >
                    <button
                        onClick={()=>dispatch(closeEditorWindow())}
                    >x</button>
                </div>
            </div>
            <div style={{width:`${width}px`}}></div>
        </>
    )
}

export default EditorWindow;