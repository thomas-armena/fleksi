import React from 'react';
import JsonEditor from '../JsonEditor/JsonEditor.js';
import './EditorWindow.scss';

const EditorWindow = ({ config }) => {

    return (
        <div className="editor-window">
            <JsonEditor config={config} />
        </div>
    )
}

export default EditorWindow;