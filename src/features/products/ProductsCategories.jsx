import React from 'react';
import { useProductsCategories } from '../../hooks/useProductsCategories';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useGlobalState } from '../../contexts/GlobalStateContext';


const ProductsCategories = () => {
    const { isLoading, error, categories } = useProductsCategories();
    const { setActiveCategory } = useGlobalState();
    const { setIsOpen } = useGlobalState();

    if (isLoading) return <Loading />
    if (error) return <Error name='categories' />

    // Add 'all' category option to the beginning of the list
    const categoryList = ['all', ...(categories || [])];

    function handleCategorization(category) {
        setActiveCategory(category);
        setIsOpen(false);
       }

    return (
        <ul className='flex flex-col gap-6 h-[40vh] overflow-y-auto bg-slate-50 rounded-4xl p-4 custom-category-scrollbar'>
            {categoryList.map(category => (
                <li key={category}
                    onClick={() => handleCategorization(category)}
                    className= 'p-3 hover:rounded-full hover:bg-slate-200 px-5 py-2'>
                    {category}
                </li>
            ))}
        </ul>
    );
}



export default ProductsCategories;