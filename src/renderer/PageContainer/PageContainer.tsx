import React, { useState } from 'react';
import './PageContainer.scss';
import ThingContainer from '../ThingContainer/ThingContainer';
import EditorWindow from '../EditorWindow/EditorWindow';
import { getNode } from '../api';
import { PageContext } from '../context';
import { ThingConfig } from '../../thing';

type PageContainerProps = {
    config: ThingConfig
}

const PageContainer = ({ config }: PageContainerProps): JSX.Element => {

    const [shouldShowEditor, setShouldShowEditor] = useState(false);
    const [currEditPath, setCurrEditPath] = useState([]);
    const [currNode, setCurrNode] = useState(config.thing);

    const getNodeFromServer = async () => {
        const newNode = await getNode(config.path);
        if (newNode) setCurrNode(newNode);
    }
    
    return (
        <PageContext.Provider value={{ shouldShowEditor, setShouldShowEditor, currEditPath, 
            setCurrEditPath , currNode, getNodeFromServer}}
        >
            <div className="page-container">
                { config.authorMode && shouldShowEditor && <EditorWindow config={config} />}
                <div className="content">
                    <ThingContainer config={config} />
                </div>
            </div>
            
        </PageContext.Provider>
    );
        
}

export default PageContainer;