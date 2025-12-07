import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineHomeModern, HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { logout } from '../features/authentication/apiAuth';
import toast from 'react-hot-toast';
import { useClickOut } from '../hooks/useClickOut';
import Categories from './Categories';
import { useGlobalState } from '../contexts/GlobalStateContext';



const MainNav = () => {
    const navigate = useNavigate()
    const { setIsOpen } = useGlobalState();

    async function signOut() {
        try {
            // 1. Await the asynchronous logout operation
            await logout();
            toast.success('Logging out...')
            // 2. Only navigate once the session is officially ended
            setTimeout(() => {
                navigate('/auth/sign-in', { replace: true });
            }, 3000);

        } catch (error) {
            toast.error('Logout failed');
            // Optional: might still navigate.
            navigate('/auth/sign-in', { replace: true });
            throw new Error(error.message);
        }
    }


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
                        <MdOutlineHistory /> <span>Orders</span>
                    </NavLink>
                </li>

                <li
                    className='pl-2 mb-auto'>
                    <Categories />
                </li>


                <li className='relative'>
                    <NavLink
                        onClick={signOut}
                        className='flex items-center py-3 px-5 gap-2 hover:bg-slate-200 hover:rounded-full'>
                        <CiLogout />
                        <span>Log Out</span>
                    </NavLink>
                </li>

                <li className='mt-25 md:mt-0'></li>
            </ul>
        </nav>
    );
};

export default MainNav;