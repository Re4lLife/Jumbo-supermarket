import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../features/products/apiProducts";
import { useActiveCategory } from "../contexts/CategoryContext";



export function useProducts() {
    const { activeCategory } = useActiveCategory();

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