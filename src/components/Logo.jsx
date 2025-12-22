import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div>
        <NavLink to='/'>
            <img 
            src='/jumbo-logo.png' 
            alt='The jumbo supermarket logo'
            className='min-w-20 sm:min-w-24 lg:max-w-32 object-contain '/>
        </NavLink>
    </div>
  );
};

export default Logo;