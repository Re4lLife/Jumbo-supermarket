import React from 'react';



const Error = ({ name }) => {
  return (
      <div className='flex flex-col justify-center gap-15 mt-[20vh] my-auto '>

        <p
          className='text-center'>Could not display {name}. Please check your internet connection.</p>


        <img
          className='mx-auto'
          src='/oops.jpeg'
          alt='Oops! Something went wrong.' />

      </div>
  );
};

export default Error;