import React from 'react';
import ReactDOM from 'react-dom';

const renderNodeToDOM = (node) => {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(renderFlexiComponent(node), domContainer);
}

const renderFlexiComponent = (node) => {
    const renderChildren = () => node.children.map(child => renderFlexiComponent(child));
    const args = getArgs(node);
    const Component = Components[node.component];
    if (!Component) return null;
    return <Component {...args}>{node.children && renderChildren()}</Component>;
}

const getArgs = (node) => {
    let args = {};
    for (const key in node) {
        if (key === 'component') continue;
        if (key === 'children') continue;
        args[key] = node[key];
    }
    return args;
}

export { renderNodeToDOM };