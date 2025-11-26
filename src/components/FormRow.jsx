import React from 'react';

const FormRow = ({ label, children, id, error }) => {
  return (
    <div className='flex flex-col gap-7'>
        <div className='flex gap-3'>
            <label htmlFor={id}>{label}</label>
            {children}
        </div>

        {error && (
            <p className='text-red-500 font-semibold mt-1'>{error}</p>
        )}
    </div>
  );
};

export default FormRow;