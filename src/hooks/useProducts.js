import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../features/products/apiProducts";
import { useGlobalState } from "../contexts/GlobalStateContext";



export function useProducts() {
    const { activeCategory } = useGlobalState();

    const queryFn = activeCategory === 'all'
    ? getProducts
    : () => getCategories(activeCategory);

    const {
        isLoading,
        data: products,
        error,
    } = useQuery({
        queryKey: ['products', activeCategory],
        queryFn: queryFn,
    });

    return { products, isLoading, error }
}