import React from 'react';

    const Button = ({ nameButton, onClick, children, className, type = 'button' }) => (
        <button
            type={type}
            onClick={onClick}
            className={className ?`${className}` :"text-black"}
            >
            {nameButton || children}
        </button>
    );

  export default Button;