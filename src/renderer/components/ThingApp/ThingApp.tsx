import React from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { useSelector } from 'react-redux'
import { RootState } from '../../state';

const ThingApp = (): JSX.Element => {

    const { authorMode, editorWindowOpen, path } = useSelector((state: RootState) => state.context);

    return (
        <div className="page-container">
            { authorMode && editorWindowOpen && <EditorWindow />}
            <div className="content">
                <ThingContainer path={path} />
            </div>
        </div>
    );
        
}

export default ThingApp;