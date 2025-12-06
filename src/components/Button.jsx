import React from 'react';

const Button = ({ children, type, disabled, onClick }) => {
    const base = 'bg-slate-500 text-white py-2 px-6 rounded-md'

    const styles = {
        primary: `${base}`,
        small: `${base}`
    }

    if (onClick) {
        return (
            <button className={styles[type]} onClick={onClick}>
                {children}
            </button>
        )
    }

    if (disabled) {
        return (
            <button className={styles[type]} disabled={disabled}>
                {children}
            </button>
        )
    }

    return (
        <button className={styles[type]}>
            {children}
        </button>
    );
};

export default Button;