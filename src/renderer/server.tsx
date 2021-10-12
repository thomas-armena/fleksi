import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import appContext from './state';

const renderNodeToString = (thingAppContext: ThingAppContext): string => {

    appContext.setInitialState(thingAppContext);

    const store = appContext.store;

    return ReactDOMServer.renderToString(
        <Provider store={store}>
            <ThingApp />
        </Provider>
    );
}

export { renderNodeToString };