import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineHomeModern, HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useClickOut from '../hooks/useClickOut';
import Categories from './Categories';
import { useGlobalState } from '../contexts/GlobalStateContext';
import { useLogOut } from '../hooks/useLogOut';



const MainNav = () => {
    const { setIsOpen } = useGlobalState();
    const { logout, isLoggingOut } = useLogOut();


    function closeSideBar() {
        setIsOpen(false);
    }


    const el = useClickOut(closeSideBar)


    return (
        <nav ref={el} className='flex flex-col h-full'>
            <ul
                className='flex flex-col gap-8 mt-1.5 px-1.5 h-full'>
                <li>
                    <NavLink
                        to='products'
                        onClick={closeSideBar}
                        className='navlink'>
                        <HiOutlineHomeModern /><span>Home</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/cart'
                        onClick={closeSideBar}
                        className='navlink'>
                        <HiOutlineShoppingCart /> <span>Cart</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/orders'
                        onClick={closeSideBar}
                        className='navlink'>
                        <MdOutlineHistory /> <span>History</span>
                    </NavLink>
                </li>

                <li
                    className='pl-2 mb-auto'>
                    <Categories />
                </li>


                <li className='relative'>
                    <NavLink
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                        className='flex items-center py-3 px-5 gap-2 hover:bg-slate-200 hover:rounded-full'>
                        <CiLogout />
                        <span>
                            {
                                isLoggingOut ?
                                    'Logging out...'
                                    :
                                    'Log Out'
                            }
                        </span>
                    </NavLink>
                </li>

                <li className='mt-25 md:mt-0'></li>
            </ul>
        </nav>
    );
};

export default MainNav;