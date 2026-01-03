import toast from 'react-hot-toast';
import supabase from '../../supabaseClient';


export async function getCartItems() {

    try {
        let { data: cart_items, error } = await supabase
            .from('cart_items')
            .select('*')
            

        if (error) {
            throw new Error(error);
        }

        return cart_items;

    } catch (err) {
        toast.error('An error occurred fetching cart items');
        throw new Error(err);

    }
}




export async function updateQuantity({ item_id, quantity }) {
    try {

        const { data, error } = await supabase
            .from('cart_items')
            // Update the 'quantity' column with the new value 
            .update({ quantity: quantity })
            // Use 'item_id' to target the correct row 
            .eq('item_id', item_id)
            .select()


        if (error) {
            throw new Error(error);
        }

        return data;


    } catch (err) {
        toast.error('Failed to update item quantity');
        throw new Error(err);

    }
}




export async function createCartItem(newItem) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .insert([newItem]) // newItem already contains the thumbnail URL
            .select()
            .single();

        if (error) throw new Error(error);
        return data;

    } catch (err) {
        toast.error('Failed to add item to cart. Please check your cart 🛒');
        throw new Error(err);
    }
}




export async function deleteCartItem(item_id) {
    try {
        const { data, error } = await supabase
            .from('cart_items')
            .delete()
            .eq('item_id', item_id);

        if (error) {
            throw new Error(error);
        }
        return data;

    } catch (err) {
        toast.error('Failed to delete item from cart');
        throw new Error(err);

    }
}


export const clearCart = async (userId) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);

    if (error) {
        toast.error('Error clearing cart');
        throw new Error(error);

    }
};