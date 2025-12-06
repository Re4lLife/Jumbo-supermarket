import React from 'react';
import { useLayOut } from '../contexts/LayOutContext';

const ToggleMenu = () => {
    //Toggle state for mobile menu
    const { setIsOpen } = useLayOut();

  

    return (
        <div
            onClick={() => setIsOpen(prev => !prev)}
            className="md:hidden flex flex-col justify-between w-8 h-6 cursor-pointer p-1">
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
        </div>
    );
};

export default ToggleMenu;