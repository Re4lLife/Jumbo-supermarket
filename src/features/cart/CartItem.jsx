import React, { useState } from 'react';
import { formatCurrency } from '../../utils/utils';
import { useUpdateQuantity } from '../../hooks/useUpdateQuantity';

const CartItem = ({ cart_item }) => {

    if (!cart_item) return null;

    const {
        title,
        brand,
        discount_price, // Unit price after discount
        thumbnail,
        quantity,
        item_id,
    } = cart_item;


    // Calculate Line Item Subtotal (Quantity * Unit Price)
    const lineTotal = discount_price * quantity;

    const {
        updateQuantity,
        isUpdating,

    } = useUpdateQuantity();


    const [localQuantity, setLocalQuantity] = useState(quantity);


    function handleUpdate(e) {
        let newQuantity = Number(e.target.value);

        if (isNaN(newQuantity) || newQuantity < 1) {
    
            setLocalQuantity(quantity);
            return;
        }


        if (newQuantity !== quantity) {
            updateQuantity({ item_id, quantity: newQuantity });
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-center border-b border-gray-200 py-6 hover:bg-gray-50 transition duration-150">

            {/* === 1. Product Image & Info (LEFT SIDE) === */}
            <div className="flex items-center w-full md:w-2/5 lg:w-1/3 mb-4 md:mb-0">

                {/* Image */}
                <div className="w-30 h-30 mb-4 overflow-hidden rounded-lg mr-4 flex-shrink-0">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col mr-5">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
                    <p className="text-sm text-indigo-600 font-medium">{brand}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Unit Price: {formatCurrency(discount_price)}
                    </p>
                </div>
            </div>

            
            <div className="flex justify-between items-center w-full md:w-3/5 lg:w-2/3 space-x-6">
                {/* Quantity Controls */}
                <div className="flex flex-col ml-2 items-center flex-shrink-0">
                    <label className="text-xs font-medium text-gray-500 mb-1 hidden sm:block">Quantity</label>
                    <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">

                        <input
                            type='number'
                            disabled={isUpdating}
                            className="w-16 p-2 text-center border-gray-300 rounded-lg focus:border-slate-500 focus:ring-1 focus:ring-slate-500 disabled:bg-gray-100 disabled:cursor-wait"
                            defaultValue={quantity}
                            onChange={(e) => setLocalQuantity(Number(e.target.value))}
                            onBlur={handleUpdate}
                            min='1'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUpdate(e)
                            }}
                        />

                    </div>
                </div>

                {/* Line Item Subtotal Display */}
                <div className="text-right flex-shrink-0 w-1/4">
                    <p className="text-sm text-gray-500 font-medium">Item Subtotal:</p>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(lineTotal)}</p>
                </div>

                {/* Remove Button */}
                <button
                    className="text-red-500 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-red-50 flex-shrink-0">

                </button>
            </div>
        </div>
    );
};

export default CartItem;