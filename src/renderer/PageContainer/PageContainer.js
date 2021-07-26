import React, { useState } from 'react';
import './PageContainer.scss';
import Node from '../Node/Node.js';
import EditorWindow from '../EditorWindow/EditorWindow.js';
import { PageContext } from '../context.js';

const PageContainer = ({config}) => {

    const [shouldShowEditor, setShouldShowEditor] = useState(false);
    const [currEditPath, setCurrEditPath] = useState([]);
    
    return (
        <PageContext.Provider value={{ shouldShowEditor, setShouldShowEditor, currEditPath, setCurrEditPath }}>
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