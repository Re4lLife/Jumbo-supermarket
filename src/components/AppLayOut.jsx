import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';
import Logo from './Logo';
import ToggleMenu from './ToggleMenu';
import { useGlobalState } from '../contexts/GlobalStateContext';
import ProfileDropDown from './../features/profile/ProfileDropDown';


const AppLayOut = () => {
  const { isOpen, searchTerm, setSearchTerm } = useGlobalState();

  return (
    <div className='grid grid-cols-1 md:grid-cols-[12rem_1fr] grid-rows-[auto_1fr] h-screen overflow-x-hidden'>

      <header className='col-span-1 md:col-span-2'>
        <Header>
          {/* Hamburger toggle for mobile */}
          <ToggleMenu />

          <Logo />

          <input
            type='search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search for your favorite items'
            className='border-red-300 border shadow-2xl rounded-full py-1.5 px-2.5 w-full sm:min-w-[90px] max-w-[800px] hover:border-blue-400 focus:outline-blue-300' />

          <div className='md:mr-40'>
            <ProfileDropDown />
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
          scrollable-content
        `}>
        <SideBar />
      </aside>



      <main className='p-6 overflow-y-auto 
          row-start-2 md:col-start-2 scrollable-content'>
        <Outlet />
      </main>

    </div >

  );
};

export default AppLayOut;
