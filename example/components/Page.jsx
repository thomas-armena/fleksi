import React from 'react';
import PropTypes from 'prop-types';

const Page = ({children}) => {
    return <div>
        {children}
    </div>
}

Page.propTypes = {
    children: PropTypes.node.isRequired
}

export default Page;