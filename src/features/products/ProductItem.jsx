import React from 'react';
import { formatCurrency } from '../../utils/utils';
import Button from '../../components/Button';
import { FaCartPlus } from "react-icons/fa6";



const ProductItem = ({ product }) => {
  const { title, discountPercentage, thumbnail, price } = product;

  const discountPrice = price * (1 - discountPercentage / 100);

  return (
    <div className='flex flex-col items-center gap-2 max-w-[100px] h-[330px]'>
      <img 
      src={thumbnail} 
      alt={`Image of ${title}`} 
      className='max-w-[100px]'/>

      <span 
      className='text-center font-semibold text-sm w-full whitespace-nowrap overflow-hidden text-ellipsis'
        title={title}>{title}</span>

      <span className='line-through'>{formatCurrency(price)}</span>

      <span>{formatCurrency(discountPrice)}</span>

      <Button type='primary'><FaCartPlus /></Button>
    </div>
  );
};

export default ProductItem;