import toast from 'react-hot-toast';
import supabase from '../supabaseClient';


export async function handleCheckout(cartItems, totalAmount, user) {
    try {
        // 1. Create a pending order in database
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                amount: totalAmount,
                items: cartItems, // Save what they are buying
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Call Edge Function
        const { data, error: funcError } = await supabase.functions.invoke('initialize-payment', {
            body: {
                email: user.email,
                amount: totalAmount,
                order_id: order.id
            }
        });

        if (funcError) throw funcError;

        toast.success('Redirecting to paystack..');

        // 3. Redirect to Paystack
        if (data?.data?.authorization_url) {
            window.location.href = data.data.authorization_url;
        }
    } catch (err) {
        console.error("Checkout failed:", err.message);
        toast.error("Could not initialize payment. Please try again.");
        
    }
}