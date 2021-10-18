import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { createStoreFromContext } from './state/store';

const renderNodeToString = (thingAppContext: ThingAppContext): string => {

    const store = createStoreFromContext(thingAppContext);

    return ReactDOMServer.renderToString(
        <Provider store={store}>
            <ThingApp />
        </Provider>
    );
}

export { renderNodeToString };