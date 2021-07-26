import React, { useContext } from 'react';
import { PageContext } from '../context.js';
import { getNodeConfigFromRelativePath } from '../util.js';

const JsonEditor = ({ config }) => {

    const { currEditPath, setCurrEditPath } = useContext(PageContext);
    if (!config) { return <div>undefined</div> }

    const listComponents = [];

    const renderObject = () => {
        const json = config.node;
        let childComponents = [];
        for (let key of Object.keys(json)) {
            const childConfig = getNodeConfigFromRelativePath(config, [key]);
            childComponents.push(<JsonEditor config={childConfig} />);
        }
        return <ul>{childComponents}</ul>
    }

    const renderValue = () => {
        const val = config.node;

        if (typeof val === 'object') {
            return renderObject();
        } else if (typeof val === 'string') {
            return <span>"{val}"</span>;
        } else {
            return <span>{val}</span>;
        }
    }

    const key = config.path[config.path.length-1];

    return (
        <li style={{ background: arrEqual(currEditPath, config.path) ? 'darkgray': 'transparent'}}>
            {key}: {renderValue()}
        </li>
        
    )
}

const arrEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

export default JsonEditor;