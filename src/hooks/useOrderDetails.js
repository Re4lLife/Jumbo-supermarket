import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../features/order-history/ordersApi";



export function useOrderDetails(id) {
    const { data: order, isPending, error } = useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrderDetails(id),

    });

    return { order, isPending, error }
}