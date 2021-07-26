import React, { useContext } from 'react';
import { PageContext } from '../context.js';
import { getNodeConfigFromRelativePath } from '../util.js';

const JsonEditor = ({ config }) => {

    const { currEditPath, setCurrEditPath } = useContext(PageContext);
    if (!config) { return <div>undefined</div> }

    const listComponents = [];
    const json = config.node;
    const renderValue = (key) => {
        const val = json[key];
        if (typeof val === 'object') {
            const childConfig = getNodeConfigFromRelativePath(config, [key]);
            return <JsonEditor config = {childConfig}/>
        } else {
            return val;
        }
    }

    for (let key of Object.keys(json)) {
        const valueComponent = renderValue(key)
        listComponents.push(<li>{key}: {valueComponent}</li>);
    }

    return (
        <ul style={{ background: arrEqual(currEditPath, config.path) ? 'darkgray': 'transparent'}}>
            {listComponents}
        </ul>
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