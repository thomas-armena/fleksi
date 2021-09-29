import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { store } from './state/store';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import componentlib from './componentlib';

const renderNodeToString = (thingAppContext: ThingAppContext): string => {
    console.log(componentlib);
    return ReactDOMServer.renderToString(
        <Provider store={store}>
            <ThingApp thingAppContext={thingAppContext}/>
        </Provider>
    );
}

export { renderNodeToString };