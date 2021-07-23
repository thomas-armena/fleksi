import React, { useState, useContext } from 'react';
import './Node.scss';
import { PageContext } from '../pageContext.js';

const Node = ({config}) => {

    const [hover, setHover] = useState(false);
    const { configBeingEditted, setConfigBeingEditted } = useContext(PageContext);

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
        setConfigBeingEditted(config);
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
            <Component {...config.node._arguments} config={config}>
                {config.node._children && renderChildren()}
            </Component>
        </div>
    ) 
};

export default Node;