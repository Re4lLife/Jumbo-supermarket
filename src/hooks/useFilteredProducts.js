import { useMemo } from 'react';


export function useFilteredProducts({ products, searchTerm }) {

    const filteredProducts = useMemo(() => {

        if(!products) {
            return [];
        }

        if(!searchTerm) {
            return products;
        }


        const searchInLowerCase = searchTerm.toLowerCase();

        return products.filter(product => 
            product.title.toLowerCase().includes(searchInLowerCase)
        );

    }, [products, searchTerm, ]);


     return filteredProducts;
}

export default useFilteredProducts;