import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Profile from '../pages/Profile';
import Logo from './Logo';
import ToggleMenu from './ToggleMenu';
import { useLayOut } from '../contexts/LayOutContext';

const AppLayOut = () => {
  const { isOpen } = useLayOut();

  return (
    <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] grid-rows-[auto_1fr] h-screen'>

      <header className='col-span-1 md:col-span-2'>
        <Header>
          {/* Hamburger toggle for mobile */}
          <ToggleMenu />


          <Logo />

          <input
            type='search'
            placeholder='Search for your favorite item'
            className='border rounded-full py-1.5 px-2.5 w-full max-w-[800px]' />

          <div className='md:mr-40'>
            <Profile />
          </div>
        </Header>
      </header>


      <aside
        className={`
          fixed top-[100px] left-0 z-10 h-full w-48
          transform transition-transform duration-500 ease-in-out
          
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}

          md:block md:static md:translate-x-0 md:w-auto md:col-start-1
          row-start-2 md:row-start-2
          overflow-y-auto
        `}>
        <SideBar />
      </aside>



      <div className='bg-pink-500 p-6 overflow-y-auto 
          //Mobile: starts below header (row-start-2)
          //Desktop (md:): Starts in the second column (col-start-2)
          row-start-2 md:col-start-2'>
        <Outlet />
      </div>

    </div >

  );
};

export default AppLayOut;
