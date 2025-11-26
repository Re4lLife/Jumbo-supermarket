import React from 'react';
import Logo from './Logo';
import Profile from '../pages/Profile';
import { useLayOut } from '../contexts/LayOutContext';

const Header = () => {
  const { setIsOpen } = useLayOut();

  return (
    <div className='flex items-center justify-between p-4 gap-10 max-h-28'>

      {/* Hamburger toggle for mobile */}
      <div 
      onClick={() => setIsOpen(prev => !prev)}
      className="md:hidden flex flex-col justify-between w-8 h-6 cursor-pointer p-1">
        <span className="block h-1 w-full bg-gray-800 rounded"></span>
        <span className="block h-1 w-full bg-gray-800 rounded"></span>
        <span className="block h-1 w-full bg-gray-800 rounded"></span>
      </div>


      <Logo />

      <input
        type='search'
        placeholder='Search for your favorite item'
        className='border rounded-full py-1.5 px-2.5 w-full max-w-[800px]' />

      <div className='md:mr-40'>
        <Profile />
      </div>
    </div>
  );
};

export default Header;