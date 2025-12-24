import React from "react";
import { Outlet } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";



const LoginPage = () => {
  return (
    // min-h-screen ensures it takes up at least the full height of the browser
    // flex-col allows the Header to stay at the top and the content to fill the rest
    <div className='min-h-full flex flex-col'>
      <HeaderMain />

      {/* flex-grow pushes this div to fill all remaining space */}
      <div className='flex grow items-center justify-center p-4'>
        <Outlet />
      </div>
    </div>
  );
};


export default LoginPage;