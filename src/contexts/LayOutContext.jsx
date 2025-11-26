import React, { createContext, useContext, useState } from 'react';

const LayOutContext = createContext();

const LayOutProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <LayOutContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </LayOutContext.Provider>
    );
};

export const useLayOut = () => {
    return useContext(LayOutContext)
}

export default LayOutProvider;