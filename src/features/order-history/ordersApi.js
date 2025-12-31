import toast from "react-hot-toast";
import supabase from "../../supabaseClient";



export async function getOrders() {
    
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id) 
        .order('created_at', { ascending: false });

    if (error) {
        toast.error('Error loading order history');
        throw new Error(error.message);
    }

    return data;
}