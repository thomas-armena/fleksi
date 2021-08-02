import React, { useState, useContext, MouseEvent } from 'react';
import './ThingContainer.scss';
import { PageContext } from '../context';
import { getThingConfigFromRelativePath, getThingFromRelativePath } from '../util';
import { ThingConfig, ThingObject } from '../../thing';
import componentlib from '../componentlib';

type ThingProps = {
    config: ThingConfig
};

const ThingContainer = ({config}: ThingProps): JSX.Element => {
    const [hover, setHover] = useState(false);
    const { setShouldShowEditor, currNode, setCurrEditPath } = useContext(PageContext);
    const thing = getThingFromRelativePath(currNode, config.relativePath);
    if (!thing) return <div>undefined</div>

    const renderChildren = () => {
        const thingObject = thing as ThingObject;
        const childComponents = [];
        for (const child of Object.keys(thingObject._children)) {
            const childNodeConfig = getThingConfigFromRelativePath(config, ['_children',child]);
            childComponents.push(<ThingContainer config={childNodeConfig}/>);
        }
        return childComponents;
    }
    const Component = componentlib[(thing as ThingObject)._kind];
    if (!Component) return <div>{JSON.stringify(thing)}</div>;

    const handleAuthorClick = (event: MouseEvent): void => {
        if (!config.authorMode) return;
        setShouldShowEditor(true);
        setCurrEditPath(config.path);
        event.stopPropagation();
    }

    const handleMouseOver = (event: MouseEvent): void => {
        if (!config.authorMode) return;
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
            <Component {...(thing as ThingObject)._arguments} config={config}>
                {(thing as ThingObject)._children && renderChildren()}
            </Component>
        </div>
    ) 
};

export default ThingContainer;