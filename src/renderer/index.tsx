import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import appContext from './state';

const renderNodeToString = (thingAppContext: ThingAppContext): string => {
    console.log("render node to string", thingAppContext)

    appContext.setInitialState({
        rootThing: thingAppContext.rootThing,
        authorMode: thingAppContext.authorMode,
        path: thingAppContext.path,
        editorWindowOpen: false,
        editPath: [],
        synced: true,
    })

    const store = appContext.store;

    return ReactDOMServer.renderToString(
        <Provider store={store}>
            <ThingApp />
        </Provider>
    );
}

export { renderNodeToString };