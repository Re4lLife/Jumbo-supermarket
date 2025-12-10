import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../features/products/apiProducts";


export function useProductDetails(id) {
    const {
        isLoading,
        data: productDetails,
        error,

    } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
        // Ensure this query doesn't run if the productId is missing (e.g., from a failing route)
        enabled: !!id,

    });

    return { productDetails, error, isLoading }
}