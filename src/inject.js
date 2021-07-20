import ReactDOM from 'react-dom';

const renderFleksiNode = (node, components) => {
    const args = getArgs(node);
    const component = components[node.component];
    if (!component) return <div>No component</div>;
    return component(args);
}

const inject = (components) => {
    var domContainer = document.querySelector('#root');
    ReactDOM.render(components.HelloWorld2(), domContainer);
}

const getArgs = (node) => {
    let args = {};
    for (const key in node) {
        if (key === 'component') continue;
        if (key === 'children') continue;
    }
    return args;
}

export default inject;

