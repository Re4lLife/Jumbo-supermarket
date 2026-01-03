import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../features/cart/apiCart";


export function useCartItems() {

    const {
        isLoading,
        error,
        data: cart_items

    } = useQuery({
        queryKey: ['cart_items'],
        queryFn: getCartItems,
        
        staleTime: 1000,
    });

    

    return { isLoading, cart_items, error };
}





