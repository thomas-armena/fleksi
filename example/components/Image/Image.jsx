import React from 'react';
import './Image.scss';

const Image = ({ src }) => {
    return <img className="image" src={src}></img>
};

export default Image;