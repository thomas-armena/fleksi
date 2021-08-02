import React from 'react';
import { ThingConfig } from '../../thing';
import JsonEditor from '../JsonEditor/JsonEditor';
import './EditorWindow.scss';

type EditorWindowProps = {
    config: ThingConfig,
}

const EditorWindow = ({ config }: EditorWindowProps): JSX.Element => {
    return (
        <div className="editor-window">
            <JsonEditor config={config} />
        </div>
    )
}

export default EditorWindow;