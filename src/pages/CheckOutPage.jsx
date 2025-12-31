import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import toast from 'react-hot-toast';
import { FaCheckCircle } from "react-icons/fa";
import { clearCart } from '../features/cart/apiCart';
import { useUser } from '../hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';



const CheckOutPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const reference = searchParams.get('reference');
  const { user } = useUser();
  const queryClient = useQueryClient()


  useEffect(() => {
    
    const verifyPayment = async () => {
      if (!reference || !user?.id) return;

      // 1. Update the order status in Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid', paystack_ref: reference })
        .select()
        .eq('status', 'pending')
        .eq('user_id', user.id);
        

      if (error) {
        setStatus('error');
        return;
      }

      clearCart(user.id);

      queryClient.invalidateQueries({ queryKey: ['orders'] });

      setStatus('success');
      toast.success("Payment Successful!");
    };

    verifyPayment();
  }, [reference, user?.id, queryClient]);

  if (status === 'verifying') return <div className="p-20 text-center text-2xl">Verifying Payment...</div>;

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl shadow-lg text-center">
      {status === 'success' ? (
        <>
          <div className="text-6xl flex justify-center text-green-400 rounded-full mb-4"> <FaCheckCircle /> </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your payment was successful and your order is being processed.</p>
          <Link to="/products" className="border border-gray-400 px-6 py-2 rounded-lg">Back to Store</Link>
        </>
      ) : (
        <>
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">We could not verify your payment. Please contact support.</p>
          <Link to="/cart" className="bg-red-600 text-white px-6 py-2 rounded-lg">Try Again</Link>
        </>
      )}
    </div>
  );
};

export default CheckOutPage;

