import React from 'react';
import PropTypes from 'prop-types';

const Person = ({ person }) => {

    return (
        <div>
           <div>name: {person.name}</div>
           <div>age: {person.age}</div>
        </div>
    )
}

Person.propTypes = {
    person: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number
    })
};

export default Person;