import React from 'react';
import './EditorWindow.scss';

const EditorWindow = ({ config }) => {

    return (
        <div className="editor-window">
            {JSON.stringify(config.node)}
        </div>
    )
}

export default EditorWindow;