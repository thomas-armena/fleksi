import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from './PageContainer/PageContainer';
import { ThingConfig } from '../thing';

const renderNodeToDOM = (config: ThingConfig): void => {
    const domContainer = document.querySelector('#root');
    ReactDOM.render(<PageContainer config={config}/>, domContainer);
};

export { renderNodeToDOM };