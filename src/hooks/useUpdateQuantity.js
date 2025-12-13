import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuantity as updateQuantityApi } from "../features/cart/apiCart";


export function useUpdateQuantity() {
    const queryClient = useQueryClient();

    const {
        mutate: updateQuantity,
        isPending: isUpdating,

    } = useMutation({
        mutationFn: updateQuantityApi,
        onSuccess: () => {
            toast.success('Quantity successfully updated');
            queryClient.invalidateQueries({ queryKey: ['cart_items'] });
        },

        onError: (err) => toast.error(err.message)
    });

    return { isUpdating, updateQuantity }
}