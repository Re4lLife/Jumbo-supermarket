import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DropDown from './DropDown';
import { HiOutlineHomeModern, HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useLayOut } from '../contexts/LayOutContext';
import { logout } from '../features/authentication/apiAuth';

const MainNav = () => {
    const navigate = useNavigate()
    const { setIsOpen } = useLayOut();

    

    function closeSideBar() {
        setIsOpen(prev => !prev)
    }


    async function signOut() {
        try {
            // 1. Await the asynchronous logout operation
            await logout();

            // 2. Only navigate once the session is officially ended
            navigate('/auth/sign-in', { replace: true });

        } catch (error) {
            console.error('Logout failed:', error.message);
            // Optional: might still navigate, or show an error toast
            navigate('/auth/sign-in', { replace: true });
        }
    }

    return (
        <nav>
            <ul className='flex flex-col gap-8 mt-1.5 px-1.5'>
                <li>
                    <NavLink
                        to='/products'
                        className='navlink'
                        onClick={closeSideBar}>
                        <HiOutlineHomeModern /><span>Home</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='cart'
                        className='navlink'
                        onClick={closeSideBar}>
                        <HiOutlineShoppingCart /> <span>Cart</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to='/orders'
                        className='navlink'
                        onClick={closeSideBar}>
                        <MdOutlineHistory /> <span>Orders</span>
                    </NavLink>
                </li>

                <li
                    className='navlink'>
                    <DropDown />
                </li>


                <li className='relative h-full'>
                    <NavLink
                        onClick={signOut}
                        className='flex items-center py-3 px-5 absolute top-[42vh] gap-2 hover:bg-slate-200 hover:rounded-full'>
                        <CiLogout />
                        <span>Log Out</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default MainNav;