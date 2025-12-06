import { useMemo } from 'react';
import { useProducts } from './useProducts'; // Assuming this hook fetches ALL products


export function useProductsCategories() {
    const { products, isLoading, error } = useProducts();

    // Use useMemo to ensure the category list is only recalculated when the product list changes
    const uniqueCategories = useMemo(() => {
        if (isLoading || error || !products || products.length === 0) {
            return [];
        }

        const allCategories = products.map(product => product.category);
        
        // 2. Use a Set to filter out duplicate categories and convert back to an array
        const uniqueCategoriesArray = [...new Set(allCategories)];
        
        return uniqueCategoriesArray;

    }, [products, isLoading, error]); // Dependency array includes product data

    return { 
        isLoading: isLoading, 
        categories: uniqueCategories, 
        error: error 
    };
}