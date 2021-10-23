import React from 'react';
import './input.css';

const Input = ({value, setValue, type, placeholder}) => {
    return (
        <input
            value={value}
            onChange={(event) => {
                setValue(event.target.value)
            }}
            type={type}
            placeholder={placeholder}/>
    );
};

export default Input;