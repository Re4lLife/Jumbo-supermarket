import React from 'react';
import { formatCurrency } from '../../utils/utils';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
    const isPending = order.status === 'pending';

    const createdAt = order.created_at;
    const dateOnly = createdAt.split('T')[0];



    return (
        <Link to={`/orders/${order?.id}`} >
            <div className='mb-20'>
                <span className='text-2xl font-bold tracking-wide flex justify-end'>
                    {dateOnly}
                </span>

                <div className='flex justify-between bg-gray-100 rounded-2xl px-3 py-4 hover:bg-gray-500 hover:text-gray-300'>
                    <div className='flex flex-col gap-6'>
                        <span className={`${isPending ? 'bg-yellow-500 text-gray-700' : 'bg-green-500'} w-20 rounded-4xl py-1 px-3 italic tracking-wide`}>
                            {order.status}
                        </span>

                        <span className='flex'>
                            <p className='font-medium'>ORDER ID</p>: {order.id}
                        </span>
                    </div>

                    <span>
                        <span className='font-bold'>Amount</span>: {formatCurrency(order.amount)}
                    </span>

                </div>
            </div>
        </Link>
    );
};

export default OrderItem;

