import React from 'react';
import { FaArrowTurnDown } from "react-icons/fa6";
import ProductsCategories from '../features/products/ProductsCategories';

const Categories = () => {
  return (
  <div className='flex flex-col'>
    <div
    className='font-semibold flex items-center gap-2 mb-4'>
      Categories <FaArrowTurnDown />
    </div>
    
    <ProductsCategories />
  </div>
  );
};

export default Categories;