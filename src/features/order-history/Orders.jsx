import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Orders = () => {
  const { orders, isPending, error } = useOrders();

  console.log(orders)

  if (isPending) return <div className="p-10 text-center"> <Loading /> </div>;
  if (error) return <div className="text-center"> <Error name='order history' /> </div>;

  return (
    <div>
      
    </div>
  )
};

export default Orders;