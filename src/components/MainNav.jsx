import React from 'react';
import { NavLink } from 'react-router-dom';
import DropDown from './DropDown';
import { HiOutlineHomeModern, HiOutlineShoppingCart } from "react-icons/hi2";
import { MdOutlineHistory } from "react-icons/md";
import { useLayOut } from '../contexts/LayOutContext';

const MainNav = () => {
    const { setIsOpen } = useLayOut()

    function closeSideBar() {
        setIsOpen(prev => !prev)
    }

    return (
        <nav>
            <ul className='flex flex-col gap-14 mt-1.5 px-1.5'>
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
            </ul>
        </nav>
    );
};

export default MainNav;