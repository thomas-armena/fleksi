import React, { useState, useEffect } from 'react';
import JsonEditor from '../JsonEditor/JsonEditor';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state';
import  './EditorWindow.scss';
import appContext from '../../state';

const EditorWindow = (): JSX.Element => {
    const { path, synced, editorWindowWidth } = useSelector((state: RootState) => state.context);
    const dispatch = useDispatch();

    return (
        <>
            <div className="editor-window" style={{width:`${editorWindowWidth}px`}}>
                <div className="editor-content">
                    <div>{synced ? 'Up to date' : 'Saving...'}</div>
                    <JsonEditor path={path} />
                </div>
                <div className="editor-drag"
                    onMouseDown={(e)=>{
                        dispatch(appContext.startDraggingEditorWindow(e.clientX));
                    }}
                ></div>
            </div>
            <div style={{width:`${editorWindowWidth}px`}}></div>
        </>
    )
}

export default EditorWindow;