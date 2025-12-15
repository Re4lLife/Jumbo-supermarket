import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem as deleteCartItemApi } from "../features/cart/apiCart";
import toast from "react-hot-toast";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();

    const { mutate: deleteItem, isPending: isDeleting } = useMutation({
        mutationFn: deleteCartItemApi,

        onSuccess: () => {
            toast.success('Item removed from cart');
            queryClient.invalidateQueries({ queryKey: ['cart_items'] });
        },

        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteItem };
}

