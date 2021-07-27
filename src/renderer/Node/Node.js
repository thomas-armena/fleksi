import React, { useState, useContext } from 'react';
import './Node.scss';
import { PageContext } from '../context.js';
import { getNodeConfigFromRelativePath, getNodeFromRelativePath } from '../util.js';

const Node = ({config}) => {
    const [hover, setHover] = useState(false);
    const { setShouldShowEditor, currNode, setCurrEditPath } = useContext(PageContext);
    const node = getNodeFromRelativePath(currNode, config.relativePath);
    if (!node) return <div>undefined</div>

    const renderChildren = () => {
        let childComponents = [];
        for (let child of Object.keys(node._children)) {
            const childNodeConfig = getNodeConfigFromRelativePath(config, ['_children',child]);
            childComponents.push(<Node config={childNodeConfig}/>);
        }
        return childComponents;
    }
    const Component = Components[node._component];
    if (!Component) return <div>{JSON.stringify(node)}</div>;

    const handleAuthorClick = (event) => {
        if (!config.shouldAuthor) return;
        setShouldShowEditor(true);
        setCurrEditPath(config.path);
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
            <Component {...node._arguments} config={config}>
                {node._children && renderChildren()}
            </Component>
        </div>
    ) 
};

export default Node;