import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../features/cart/apiCart";
import { useUser } from "./useUser";

export function useCartItems() {
    const { user } = useUser();

    const {
        isLoading,
        error,
        data: cart_items
    } = useQuery({
        queryKey: ['cart_items'], 
        queryFn: () => getCartItems(user?.id), 
        enabled: !!user?.id,
        
        staleTime: 1000,
    });

    return { isLoading, cart_items, error };
}





