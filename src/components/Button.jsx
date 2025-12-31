import React from 'react';

const Button = ({ children, type = 'primary', className = '', htmlType = 'submit', disabled, onClick }) => {
    // 1. Check if the incoming className already has a background color (bg-)
    const hasCustomBg = className.includes('bg-');

    // 2. Only apply bg-slate-500 if NO custom background is provided
    const base = `${!hasCustomBg ? 'bg-slate-500' : ''} text-white py-2 px-6 rounded-md transition-all`;

    const styles = {
        primary: base,
        small: `${base} text-sm px-4`
    };

    return (
        <button
            type={htmlType}
            className={`${styles[type] || styles.primary} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};


export default Button;