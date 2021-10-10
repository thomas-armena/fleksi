import React from 'react';
import './Image.scss';
import PropTypes from 'prop-types';

const Image = ({ src }) => {
    return <img className="image" src={src}></img>
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
}

export default Image;