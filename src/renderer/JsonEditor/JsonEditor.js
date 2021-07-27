import React, { useContext, useState } from 'react';
import { PageContext } from '../context.js';
import { getNodeConfigFromRelativePath } from '../util.js';
import { updateNode } from '../api.js';

const JsonEditor = ({ config }) => {

    const startingNode = config ? config.node : null;
    const [edittedNode, setEdittedNode] = useState(startingNode);
    const { currEditPath, getNodeFromServer } = useContext(PageContext);
    if (!config) { return <div>undefined</div> }
    const isBeingEditted = arrEqual(currEditPath, config.path);
    const parentIsBeingEditted = arrIsSubset(currEditPath, config.path);

    const renderObject = () => {
        const json = edittedNode;
        if (!json) { return <div>undefined</div>}
        let childComponents = [];
        for (let key of Object.keys(json)) {
            const childConfig = getNodeConfigFromRelativePath(config, [key]);
            childComponents.push(<JsonEditor config={childConfig} />);
        }
        return <ul>{childComponents}</ul>
    }

    const handleValueChange = async (event) => {
        setEdittedNode(event.target.value);
        const result = await updateNode(config.path, event.target.value);
        getNodeFromServer();
    }

    const renderValue = () => {
        const val = edittedNode;

        if (typeof val === 'object') {
            return renderObject();
        } else if (typeof val === 'string') {
            return <span>"{val}"</span>;
        } else {
            return <span>{val}</span>;
        }
    }

    const renderValueEditor = () => {
        const val = edittedNode;
        if (typeof val === 'object') {
            return renderObject();
        } else if (typeof val === 'string') {
            return <input type='text' value={edittedNode} onChange={handleValueChange}></input>;
        } else {
            return <span>{val}</span>;
        }
    }

    const key = config.path[config.path.length-1];

    return (
        <li style={{ background: isBeingEditted ? 'darkgray': 'transparent'}}>
            {key}: {parentIsBeingEditted ? renderValueEditor() : renderValue()}
        </li>
        
    )
}

const arrEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

const arrIsSubset = (arr1, arr2) => {
    if (arr1.length > arr2.length) return false;
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

export default JsonEditor;