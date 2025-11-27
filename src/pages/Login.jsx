import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderMain from '../components/HeaderMain';

const Login = () => {
  return (
    <>
      <HeaderMain />

      <div className='flex justify-center'>
        <Outlet />
      </div>
    </>
  );
};

export default Login;