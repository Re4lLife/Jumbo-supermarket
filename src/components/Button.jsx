import React from 'react';

const Button = ({ children, type, disabled }) => {
    const base = 'bg-slate-500 text-white py-2 px-5'

    const styles = {
        primary: `${base}`,
        small: `${base}`
    }

    if (disabled) {
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    }

    return (
        <button className={styles[type]}>
            {children}
        </button>
    );
};

export default Button;