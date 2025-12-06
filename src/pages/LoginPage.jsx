import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderMain from '../components/HeaderMain';

const LoginPage = () => {
  return (
    <>
      <HeaderMain />

      <div className='flex justify-center mt-auto mb-auto'>
        <Outlet />
      </div>
    </>
  );
};

export default LoginPage;