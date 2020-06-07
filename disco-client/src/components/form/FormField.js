import React from 'react';

export default ({ type, name, value, handleChange, ...rest }) => (
    <input 
        type={type} value={value} onChange={handleChange} 
        name={name} placeholder={name} {...rest} 
    />
);

