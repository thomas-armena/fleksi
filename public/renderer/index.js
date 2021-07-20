import React from 'react';
import ReactDOM from 'react-dom';

var renderNodeToDOM = function renderNodeToDOM(node) {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(renderFlexiComponent(node), domContainer);
};

var renderFlexiComponent = function renderFlexiComponent(node) {
    var renderChildren = function renderChildren() {
        return node.children.map(function (child) {
            return renderFlexiComponent(child);
        });
    };
    var args = getArgs(node);
    var Component = Components[node.component];
    if (!Component) return null;
    return React.createElement(
        Component,
        args,
        node.children && renderChildren()
    );
};

var getArgs = function getArgs(node) {
    var args = {};
    for (var key in node) {
        if (key === 'component') continue;
        if (key === 'children') continue;
        args[key] = node[key];
    }
    return args;
};

export { renderNodeToDOM };