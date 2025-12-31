import React from 'react';
import Button from "./Button";

const ConfirmDelete = ({ title, onConfirm, disabled, onCloseModal }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl w-full border border-gray-100">

      <p className="text-gray-600 leading-relaxed mb-8">
        Are you sure you want to remove <span className="font-bold text-gray-800">{title}</span> from your cart?   This action cannot be undone.
      </p>

      <div className="flex gap-6 justify-end">
        <Button
          type='primary'
          disabled={disabled}
          onClick={onCloseModal}
          className="px-6 py-2 bg-indigo-600 text-white
           hover:bg-gray-100 rounded-lg transition"
        >
          Cancel
        </Button>

        <button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition disabled:bg-red-300"
          disabled={disabled}
          onClick={() => {
            onConfirm();
          }}
        >
          {disabled ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;

