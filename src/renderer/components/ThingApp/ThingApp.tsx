import React, { useEffect } from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { ThingAppContext } from '../../../utils/types';
import { useSelector, useDispatch } from 'react-redux'
import appContext from '../../state';
import { RootState } from '../../state';

const ThingApp = (): JSX.Element => {

    const { authorMode, editorWindowOpen, path, rootThing } = useSelector((state: RootState) => state.context);
    console.log("ROOT THING", rootThing);
    console.log("PATH", path);

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