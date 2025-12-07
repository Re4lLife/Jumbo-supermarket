import React from 'react';
import { useGlobalState } from '../contexts/GlobalStateContext';

const ToggleMenu = () => {
    //Toggle state for mobile menu
    const { setIsOpen } = useGlobalState();

  function toggle(e) {
        e.stopPropagation();  // Prevent click-outside from firing
        setIsOpen(prev => !prev);
  }

    return (
        <div
            onClick={toggle}
            className="md:hidden flex flex-col justify-between w-8 h-6 cursor-pointer p-1">
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
            <span className="block h-1 w-full bg-gray-800 rounded"></span>
        </div>
    );
};

export default ToggleMenu;