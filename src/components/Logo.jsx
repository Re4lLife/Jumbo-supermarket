import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
        <NavLink to='/'>
            <img 
            src='/jumbo-logo.png' 
            alt='The jumbo supermarket logo'
            className='w-32 object-contain '/>
        </NavLink>
    </div>
  );
};

export default Logo;