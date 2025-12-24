import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
        <NavLink to='/'>
            <img 
            src='/jumbo-logo.png' 
            alt='The jumbo supermarket logo'
            className='w-20 min-w-20 sm:w-24 lg:w-32 object-contain'/>
        </NavLink>
    </div>
  );
};

export default Logo;