import React from 'react';

const Header = ({ children }) => {

  return (
    <header className='flex items-center justify-between p-4 gap-10 max-h-28'>
      {children}
    </header>
  );
};

export default Header;