import React from 'react';

const Button = ({ children, type = 'primary', className = '', htmlType = 'submit', disabled, onClick }) => {
    const base = 'bg-slate-500 text-white py-2 px-6 rounded-md transition-all';

    const styles = {
        primary: `${base}`,
        small: `${base} text-sm px-4`
    };

    return (
        <button
            type={htmlType}
            // 🎯 Combine internal styles AND the passed-in className
            className={`${styles[type] || styles.primary} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;