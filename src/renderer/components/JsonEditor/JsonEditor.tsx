import React from 'react';
import { updateNode } from '../../api';
import { PathNodes } from '../../../utils/types';
import { useSelector, useDispatch } from 'react-redux'
import { getThingFromPath } from '../../../utils/path';
import { RootState } from '../../state/store';
import { editThing } from '../../state/contextSlice';

type JsonEditorProps = {
    path: PathNodes
}

const JsonEditor = ({ path }: JsonEditorProps): JSX.Element => {
    const dispatch = useDispatch();
    const { rootThing, editPath } = useSelector((state: RootState) => state.context);
    const thing = getThingFromPath(rootThing, path);

    const isBeingEditted = arrEqual(editPath, path);
    const parentIsBeingEditted = arrIsSubset(editPath, path);

    const renderObject = (): JSX.Element => {
        const childComponents = [];
        for (const key of Object.keys(thing)) {
            const childPath = [...path, key]
            childComponents.push(<JsonEditor path={childPath} />);
        }
        return <ul>{childComponents}</ul>
    }

    const handleValueChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        dispatch(editThing({ path, newValue }));
        await updateNode(path, newValue);
        // getNodeFromServer();
    }

    const renderValue = (): JSX.Element => {
        if (typeof thing === 'object') {
            return renderObject();
        } else if (typeof thing === 'string') {
            return <span>{'"'}{thing}{'"'}</span>;
        } else {
            return <span>{thing}</span>;
        }
    }

    const renderValueEditor = (): JSX.Element => {
        if (typeof thing === 'object') {
            return renderObject();
        } else if (typeof thing === 'string') {
            return <input type='text' value={thing as string} onChange={handleValueChange}></input>;
        } else {
            return <span>{thing}</span>;
        }
    }

    const key = path[path.length-1];
    return (
        <li style={{ background: isBeingEditted ? 'darkgray': 'transparent'}}>
            {key}: {parentIsBeingEditted ? renderValueEditor() : renderValue()}
        </li>
        
    )
}

const arrEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

const arrIsSubset = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length > arr2.length) return false;
    for (let i = 0; i < arr1.length; i++){
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

export default JsonEditor;