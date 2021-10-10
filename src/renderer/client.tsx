import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import appContext from './state';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

declare let thingAppContext: ThingAppContext;

appContext.setInitialState({
    rootThing: thingAppContext.rootThing,
    authorMode: thingAppContext.authorMode,
    path: thingAppContext.path,
    editorWindowOpen: false,
    editPath: [],
    synced: true,
})

ReactDOM.hydrate(
    <Provider store={appContext.store}>
        <ThingApp />
    </Provider>, document.getElementById('root')
);
