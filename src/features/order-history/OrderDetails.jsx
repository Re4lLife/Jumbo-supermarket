import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useOrderDetails } from '../../hooks/useOrderDetails';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { formatCurrency } from '../../utils/utils'



const OrderDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        order,
        isPending,
        error,

    } = useOrderDetails(id);


    if (isPending) return <Loading size='base' />;
    if (error) return <Error name='order details' />



    return (
        <div className="w-[60vw] min-w-[310px] mx-auto p-6">
            <button
                onClick={() => navigate('/orders')}
                className='mb-8 text-blue-500 hover:text-blue-900'>
                &larr; Back
            </button>

            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8)}..</h1>
                <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                </span>
            </header>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-gray-300 bg-gray-50">
                    <h2 className="font-semibold">Order details</h2>
                </div>

                <ul className="divide-y">
                    {order.items.map((item) => (
                        <li key={item.item_id} className="p-6 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.brand} x {item.quantity}</p>
                            </div>
                            <p className="font-bold">{formatCurrency(item.discount_price)}</p>
                        </li>
                    ))}
                </ul>

                <div className="p-6 bg-gray-50 flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-2xl font-black text-indigo-600">{formatCurrency(order.amount)}</span>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;