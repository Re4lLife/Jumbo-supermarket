import React from 'react';

const Error = ({ name }) => {
  return (
    <div className='flex flex-col gap-20 my-auto justify-center'>
        <p 
        className='text-center'>Could not display {name}. Please check your internet connection.</p>


        <img 
        className='mx-auto'
        src='/oops.jpeg' 
        alt='Oops! Something went wrong.'/>

    </div>
  );
};

export default Error;