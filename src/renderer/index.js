import React from 'react';
import ReactDOM from 'react-dom';
import PageContainer from './PageContainer/PageContainer.js';

const renderNodeToDOM = (config) => {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(<PageContainer config={config}/>, domContainer);
};

export { renderNodeToDOM };