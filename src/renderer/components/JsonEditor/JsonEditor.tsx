import React from 'react';
import { PathNodes } from '../../../utils/types';
import { getThingFromPath } from '../../../utils/path';
import './JsonEditor.scss';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { editThingAndRefetch } from '../../state/contextSlice';
import { hideThing, revealThing } from '../../state/editorWindowSlice';
import { openCreatorWindow } from '../../state/creatorWindowSlice';

type JsonEditorProps = {
    path: PathNodes;
};

const JsonEditor = ({ path }: JsonEditorProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const { rootThing } = useAppSelector((state) => state.context);
    const { editPath, revealMap } = useAppSelector(
        (state) => state.editorWindow
    );
    const thing = getThingFromPath(rootThing, path);

    const isRevealed = revealMap[path.join('/')];

    const isBeingEditted = arrEqual(editPath, path);
    const parentIsBeingEditted = arrIsSubset(editPath, path);

    const renderObject = (): JSX.Element => {
        const childComponents = [];
        for (const key of Object.keys(thing)) {
            const childPath = [...path, key];
            childComponents.push(<JsonEditor path={childPath} />);
        }
        return <ul>{childComponents}</ul>;
    };

    const handleValueChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = event.target.value;
        dispatch(editThingAndRefetch({ path, newValue }));
    };

    const renderValueEditor = (): JSX.Element => {
        if (typeof thing === 'object') {
            return renderObject();
        } else if (typeof thing === 'string') {
            return (
                <input
                    type="text"
                    value={thing as string}
                    onChange={handleValueChange}
                ></input>
            );
        } else {
            return <span>{thing}</span>;
        }
    };

    const renderCreateButton = (): JSX.Element => {
        return (
            <button
                className="create-button"
                onClick={() => {
                    dispatch(openCreatorWindow(path));
                }}
            >
                <i className="material-icons">add</i>
            </button>
    )
    }

    const key = path[path.length - 1];
    let className = 'json-editor';
    if (isBeingEditted) className += ' focused';
    return (
        <li className={className}>
            <div
                className="json-key"
                onClick={() => {
                    if (isRevealed) {
                        dispatch(hideThing(path));
                    } else {
                        dispatch(revealThing(path));
                    }
                }}
            >
                <i className="material-icons">
                    {isRevealed
                        ? 'keyboard_arrow_down'
                        : 'keyboard_arrow_right'}
                </i>
                {key}
                {renderCreateButton()}
            </div>
            {isRevealed && (
                <div className="json-value">{renderValueEditor()}</div>
            )}
        </li>
    );
};

const arrEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
};

const arrIsSubset = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length > arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
};

export default JsonEditor;
