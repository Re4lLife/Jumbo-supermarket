import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useActiveCategory = () => {
    return useContext(CategoryContext);
}

export default CategoryProvider;