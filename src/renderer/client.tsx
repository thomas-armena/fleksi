import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStoreFromContext } from './state/store';

declare let thingAppContext: ThingAppContext;

const store = createStoreFromContext(thingAppContext);

ReactDOM.hydrate(
    <Provider store={store}>
        <ThingApp />
    </Provider>, document.getElementById('root')
);
