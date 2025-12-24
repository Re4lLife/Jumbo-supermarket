import React from 'react';
import { Pagination, Autoplay, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/grid';
import 'swiper/css';
import { useProducts } from '../../hooks/useProducts';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ProductItem from './ProductItem'
import useFilteredProducts from '../../hooks/useFilteredProducts';
import { useGlobalState } from '../../contexts/GlobalStateContext';

const ProductList = () => {
    const { 
        searchTerm
     } = useGlobalState();


    const { 
        isLoading,
        error,
        products: allAndCategorizedProducts,
     } = useProducts();


     const products = useFilteredProducts({ products: allAndCategorizedProducts, searchTerm });



    if (isLoading) return <Loading />;
    if (error) return <Error name='products' />;
    if (!products || !products.length) return (
        <div className='my-auto text-center'>
            No products available.
        </div>
    );

    return (
        <Swiper
            modules={[Pagination, Autoplay, Grid]}

            className="h-[80vh] sm:h-[75vh] lg:h-[82vh] w-full"
            // className="h-[500px] sm:h-[550px] lg:h-[550px] w-full" 
            grid={{
                rows: 2, 
                fill: 'row',
            }}
 
            navigation={true}

            pagination={{ clickable: true }}

            autoplay={{ delay: 4000, disableOnInteraction: false }}

            spaceBetween={20} 

            slidesPerView={2} 
            
            breakpoints={{
                
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                },
            }}
        >
            <div className='h-full w-full'>
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <ProductItem product={product} />
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    );
};

export default ProductList;