// FormRow.jsx

import React from "react";

const FormRow = ({ children, id, error }) => {
  return (

    <div className='flex flex-col mb-20 py-3 w-full max-w-md mx-auto'>


      <div className='flex flex-col gap-1 w-full'>
        {/* <label
          htmlFor={id}
          className='text-gray-700 font-medium'
        >{label}</label> */}
        {children}
      </div>


      {error && (
        <p className='text-red-600  font-semibold mt-1 pl-1'>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormRow;

