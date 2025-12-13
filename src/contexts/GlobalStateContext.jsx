import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm ] = useState('');

    return (
        <GlobalStateContext.Provider 
        value={{ searchTerm, setSearchTerm, isOpen, setIsOpen, activeCategory, setActiveCategory }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    return useContext(GlobalStateContext);
}

export default GlobalStateProvider;