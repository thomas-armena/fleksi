import React from 'react';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { store } from './state/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

declare let thingAppContext: ThingAppContext;

console.log("THING APP CONTEXT");
console.log(thingAppContext);

ReactDOM.hydrate(
    <Provider store={store}>
        <ThingApp thingAppContext={thingAppContext}/>
    </Provider>, document.getElementById('root')
);
