import React, { useState, useEffect } from 'react';
import JsonEditor from '../JsonEditor/JsonEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import  './EditorWindow.scss';

const EditorWindow = (): JSX.Element => {
    const { path, synced } = useSelector((state: RootState) => state.context);

    const [isDragging, setIsDragging] = useState(false);
    const [dragReference, setDragReference] = useState(-1);
    const [widthReference, setWidthReference] = useState(-1);
    const [width, setWidth] = useState(300);

    return (
        <div className="editor-window">
            <div className="editor-content" style={{width:`${width}px`}}>
                <div>{synced ? 'Up to dataz' : 'Saving...'}</div>
                <JsonEditor path={path} />
            </div>
            <div className="editor-drag"
                onMouseDown={(e)=>{
                    setIsDragging(true);
                    setDragReference(e.clientX);
                    setWidthReference(width);
                }}
                onMouseMove={(e)=>{
                    if (isDragging) {
                        const dragDifference = e.clientX - dragReference;
                        setWidth(widthReference + dragDifference);
                    }
                }}
                onMouseLeave={()=>{
                    setIsDragging(false);
                }}
                onMouseUp={()=>{
                    setIsDragging(false);
                }}
            ></div>
        </div>
    )
}

export default EditorWindow;