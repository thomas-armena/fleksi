import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './render.scss';

const renderNodeToDOM = (config) => {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(<Node config={config}/>, domContainer);
}

const Node = ({config}) => {

    const [hover, setHover] = useState(false);

    const renderChildren = () => {
        let childComponents = [];
        for (let child of Object.values(config.node._children)) {
            const childConfig = { ...config, node: child };
            childComponents.push(<Node config={childConfig}/>);
        }
        return childComponents;
    }
    const Component = Components[config.node._component];
    if (!Component) return <div>{JSON.stringify(config.node)}</div>;

    const handleAuthorClick = (event) => {
        if (!config.shouldAuthor) return;
        console.log(config);
        event.stopPropagation();
    }

    const handleMouseOver = (event) => {
        if (!config.shouldAuthor) return;
        setHover(true);
        event.stopPropagation();
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    return (
        <div onClick={handleAuthorClick} 
            className={hover ? 'highlight' : ''}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <Component {...config.node._arguments}>
                {config.node._children && renderChildren()}
            </Component>
        </div>
    ) 
};

export { renderNodeToDOM };