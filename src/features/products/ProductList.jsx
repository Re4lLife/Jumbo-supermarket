import { Pagination, Autoplay, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/grid';
import 'swiper/css';
import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ProductItem from './ProductItem'

const ProductList = () => {

    const { isLoading, error, products } = useProducts();

    if (isLoading) return <Loading />;
    if (error) return <Error name='products' />;
    if (!products || !products.length) return (
        <div className='my-auto text-center'>
            No products available.
        </div>
    );

    return (
        <Swiper
            // 3. REGISTER MODULES
            modules={[Pagination, Autoplay, Grid]}

            grid={{
                rows: 2, // ⬅️ Set the number of rows you want (e.g., 2)
                fill: 'row', // Ensures slides fill row by row
            }}

            // 4. ACTIVATE FEATURES
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}

            spaceBetween={20} // Increased spaceBetween slightly
            slidesPerView={2} // Default mobile slides 

            // 5. BREAKPOINTS: Adjusted slidesPerView for clarity
            breakpoints={{
                // Small devices (>= 640px)
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                // Medium devices (>= 1024px)
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                },
            }}
        >
            <div className='flex items-center flex-col'>
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