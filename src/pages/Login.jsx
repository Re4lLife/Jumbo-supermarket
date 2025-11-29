import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderMain from '../components/HeaderMain';

const Login = () => {
  return (
    <>
      <HeaderMain />

      <div className='flex justify-center mt-auto mb-auto'>
        <Outlet />
      </div>
    </>
  );
};

export default Login;