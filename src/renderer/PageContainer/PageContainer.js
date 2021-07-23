import React, { useState } from 'react';
import './PageContainer.scss';
import Node from '../Node/Node.js';
import EditorWindow from '../EditorWindow/EditorWindow.js';
import { PageContext } from '../pageContext.js';

const PageContainer = ({config}) => {

    const [configBeingEditted, setConfigBeingEditted] = useState(null);
    console.log(configBeingEditted);
    return (
        <PageContext.Provider value={{ configBeingEditted, setConfigBeingEditted }}>
            <div className="page-container">
                <Node config={config} />
            </div>
            { config.shouldAuthor && configBeingEditted && <EditorWindow config={configBeingEditted} />}
        </PageContext.Provider>
    );
        
}

export default PageContainer;