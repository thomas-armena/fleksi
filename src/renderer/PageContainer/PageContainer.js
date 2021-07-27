import React, { useState } from 'react';
import './PageContainer.scss';
import Node from '../Node/Node.js';
import EditorWindow from '../EditorWindow/EditorWindow.js';
import { getNode } from '../api.js';
import { PageContext } from '../context.js';

const PageContainer = ({config}) => {

    const [shouldShowEditor, setShouldShowEditor] = useState(false);
    const [currEditPath, setCurrEditPath] = useState([]);
    const [currNode, setCurrNode] = useState(config.node);

    const getNodeFromServer = async () => {
        const newNode = await getNode(config.path);
        if (newNode) setCurrNode(newNode);
    }
    
    return (
        <PageContext.Provider value={{ shouldShowEditor, setShouldShowEditor, currEditPath, 
            setCurrEditPath , currNode, getNodeFromServer}}
        >
            <div className="page-container">
                { config.shouldAuthor && shouldShowEditor && <EditorWindow config={config} />}
                <div className="content">
                    <Node config={config} />
                </div>
            </div>
            
        </PageContext.Provider>
    );
        
}

export default PageContainer;