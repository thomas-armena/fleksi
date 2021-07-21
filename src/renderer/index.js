import React from 'react';
import ReactDOM from 'react-dom';

const renderNodeToDOM = (node) => {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(renderFlexiComponent(node), domContainer);
}

const renderFlexiComponent = (node) => {
    const renderChildren = () => {
        let childComponents = [];
        for (let child of Object.values(node._children)) {
            childComponents.push(renderFlexiComponent(child));
        }
        return childComponents;
    }
    const Component = Components[node._component];
    if (!Component) return <div>{JSON.stringify(node)}</div>;
    return (
        <Component {...node._arguments}>
            {node._children && renderChildren()}
        </Component>
    );
}

export { renderNodeToDOM };