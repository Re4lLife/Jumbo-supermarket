import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCartItem } from "../features/cart/apiCart"
import toast from "react-hot-toast"


export function useAddItemToCart() {
    const queryClient = useQueryClient();

    const {
        isPending: isAdding,
        mutate: addItem,

    } = useMutation({
        mutationFn: createCartItem,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart_items'] })
            toast.success('Product successfully added to cart. 🛒')
        },

        onError: (err) => {
            console.log(err.message);
            toast.error('Please check your cart');
        }
    });

    return { isAdding, addItem }
}