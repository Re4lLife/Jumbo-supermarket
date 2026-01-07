import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import OrderItem from './OrderItem';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const { orders, isPending, error } = useOrders();

  if (isPending) return <div className="p-10 text-center"> <Loading size='base' /> </div>;
  if (error) return <div className="text-center"> <Error name='order history' /> </div>;


  if (orders.length === 0) {
    return (
      <div className="text-center py-20 mt-[20vh]">
        <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      {orders.map((order) => <OrderItem order={order} key={order.id} />)}
    </div>
  )
};

export default OrderList;