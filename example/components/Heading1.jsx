import React from 'react';
import PropTypes from 'prop-types';

const Heading1 = ({ text }) => {
    return (
        <h1>{text}</h1>
    );
};

Heading1.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Heading1;