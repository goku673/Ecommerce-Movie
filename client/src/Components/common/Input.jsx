import React from 'react';

    const Input = ({ type , placeholder, value, onChange, className }) => (
            <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className ? `${className}` : "text-white"}
            />
         );

    export default Input;