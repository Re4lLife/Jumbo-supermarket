import React, { useMemo, useState } from 'react';
import { useCartItems } from '../../hooks/useCartItems';
import CartItem from './CartItem';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Button from '../../components/Button';
import { formatCurrency } from '../../utils/utils';
import { RiShoppingBag2Fill } from "react-icons/ri";
import { handleCheckout } from '../../hooks/useCheckout';
import { useUser } from '../../hooks/useUser';


const CartItems = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false); //Just for a 'loading' in the 'proceed to checkout' button.
  const {
    isLoading,
    cart_items,
    error,

  } = useCartItems();

  const { user } = useUser();



  const grandTotal = useMemo(() => {
    return cart_items?.reduce(
      (sum, item) => sum + (item.discount_price * item.quantity), 0);
  }, [cart_items]);


  if (isLoading) return <Loading size='base' />
  if (error) return <Error name='cart items' />
  if (!cart_items || cart_items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Your Shopping Cart is Empty 🙁</h2>
        <p className="text-gray-500 mt-2">Find something great in our products section!</p>
      </div>
    );
  }


  async function onCheckout() {
    setIsCheckingOut(true);
    try {
      await handleCheckout(cart_items, grandTotal, user);

    } finally {
      setIsCheckingOut(false);

    }
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl flex justify-center items-center gap-3 font-extrabold mb-8 border-b border-slate-200 pb-4">
        <span className='text-red-500 uppercase'>Shopping spree!</span> <RiShoppingBag2Fill className='text-slate-400' />
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* === Cart Item List (LEFT) === */}
        <div className="lg:w-3/4 rounded-2xl">
          {cart_items.map(cart_item =>
            <CartItem key={cart_item.item_id} cart_item={cart_item} />
          )}
        </div>

        {/* === Order Summary (RIGHT) === */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl flex flex-col gap-12 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>


            <div className="flex justify-between border-b pb-2 mb-4">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>


            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button
              type='primary'
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
              >
              {isCheckingOut ? <Loading size='small' /> : 'Proceed to Checkout'}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItems;