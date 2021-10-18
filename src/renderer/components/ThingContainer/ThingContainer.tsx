import React, { useState, MouseEvent } from 'react';
import './ThingContainer.scss';
import { PathNodes, ThingComponent, ThingObject } from '../../../utils/types';
import { getThingFromPath } from '../../../utils/path';
import componentLib from '../../../utils/componentLib';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { focusOnThing } from '../../state/editorWindowSlice';

type ThingProps = {
    path: PathNodes,
};

const ThingContainer = ({ path }: ThingProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const [ hover, setHover ] = useState(false);
    const { rootThing, authorMode } = useAppSelector((state) => state.context);
    const thing = getThingFromPath(rootThing, path);

    if (!thing) return <div>undefined</div>

    const renderChildren = () => {
        const thingObject = thing as ThingObject;
        const childComponents = [];
        for (const child of Object.keys(thingObject._children)) {
            const childPath = [ ...path, '_children', child];
            childComponents.push(<ThingContainer path={childPath} />);
        }
        return childComponents;
    }
    const Component = componentLib[(thing as ThingObject)._kind];
    if (!Component) return <div>{JSON.stringify(thing)}</div>;

    const handleAuthorClick = (event: MouseEvent): void => {
        if (!authorMode) return;
        dispatch(focusOnThing(path));
        event.stopPropagation();
    }

    const handleMouseOver = (event: MouseEvent): void => {
        if (!authorMode) return;
        setHover(true);
        event.stopPropagation();
    }

    const handleMouseOut = () => {
        setHover(false);
    }

    const thingComponent: ThingComponent = { thing, authorMode, path }

    return (
        <div onClick={handleAuthorClick} 
            className={hover ? 'highlight' : ''}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <Component {...(thing as ThingObject)._arguments} thingComponent={thingComponent}>
                {(thing as ThingObject)._children && renderChildren()}
            </Component>
        </div>
    ) 
};

export default ThingContainer;