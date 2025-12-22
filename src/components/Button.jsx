import React from 'react';

const Button = ({ children, type = 'primary', htmlType = 'submit', disabled, onClick }) => {
    const base = 'bg-slate-500 text-white py-2 px-6 rounded-md';

    const styles = {
        primary: `${base}`,
        small: `${base} text-sm px-4`
    };

    return (
        <button
            type={htmlType} // 🎯 This prevents accidental form submission
            className={styles[type] || styles.primary}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;