import React from 'react';
import JsonEditor from '../JsonEditor/JsonEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import './EditorWindow.scss';

const EditorWindow = (): JSX.Element => {
    const { path, synced } = useSelector((state: RootState) => state.context);
    return (
        <div className="editor-window">
            <div>{synced ? 'Up to date' : 'Saving...'}</div>
            <JsonEditor path={path} />
        </div>
    )
}

export default EditorWindow;