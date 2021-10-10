import React from 'react';
import './Hero.scss';
import PropTypes from 'prop-types';

const Hero = ({ title })=> {
    return <h1 className="hero">{ title }</h1>
};

Hero.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Hero;