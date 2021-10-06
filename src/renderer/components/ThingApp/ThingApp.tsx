import React, { useEffect } from 'react';
import './ThingApp.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { ThingAppContext } from '../../../utils/types';
import { useSelector, useDispatch } from 'react-redux'
import { init } from '../../state/contextSlice';
import { RootState } from '../../state/store';

type ThingAppProps = {
    thingAppContext: ThingAppContext
}

const ThingApp = ({ thingAppContext }: ThingAppProps): JSX.Element => {

    console.log('rendering thing app', thingAppContext);
    const dispatch = useDispatch();
    const { authorMode, editorWindowOpen, path } = useSelector((state: RootState) => state.context);

    useEffect(() => {
        dispatch(init(thingAppContext));
    }, []);

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