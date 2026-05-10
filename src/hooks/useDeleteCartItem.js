import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem as deleteCartItemApi } from "../features/cart/apiCart";
import toast from "react-hot-toast";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();

    const { mutate: deleteItem, isPending: isDeleting } = useMutation({
        mutationFn: ({ item_id, userId }) => deleteCartItemApi({ item_id, userId }),

        onSuccess: () => {
            toast.success('Item removed from cart');
            queryClient.invalidateQueries({ queryKey: ['cart_items'] });
        },

    });

    return { isDeleting, deleteItem };
}

