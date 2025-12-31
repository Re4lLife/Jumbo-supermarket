import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../features/order-history/ordersApi";



export function useOrders() {
    const { 
        data: orders,
        isPending,
        error

     } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,

    });

    return { orders, isPending, error } 
}