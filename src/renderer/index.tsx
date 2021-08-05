import React from 'react';
import ReactDOM from 'react-dom';
import ThingApp from './components/ThingApp/ThingApp';
import { ThingAppContext } from '../utils/types';
import { store } from './state/store';
import { Provider } from 'react-redux';

const renderNodeToDOM = (thingAppContext: ThingAppContext): void => {
    const domContainer = document.querySelector('#root');
    ReactDOM.render(
        <Provider store={store}>
            <ThingApp thingAppContext={thingAppContext}/>
        </Provider>, 
        domContainer
    );
};

export { renderNodeToDOM };