import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetails } from '../../hooks/useProductDetails';
import Error from '../../components/Error';
import Loading from '../../components/Loading'
import { formatCurrency } from '../../utils/utils';
import Button from '../../components/Button';
import { useAddItemToCart } from '../../hooks/useAddItemToCart';
import { useDeleteCartItem } from '../../hooks/useDeleteCartItem';
import { useCartItems } from '../../hooks/useCartItems';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';


const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        isAdding,
        addItem } = useAddItemToCart();
    const {
        isLoading,
        error,
        productDetails

    } = useProductDetails(id);
    const {
        isDeleting,
        deleteItem

    } = useDeleteCartItem();
    const {
        cart_items

    } = useCartItems();


    const productId = Number(id);


    if (isLoading) return <Loading />;
    if (error) return <Error name={`product details`} />;
    if (!productDetails) return <p className='my-auto text-center'>Product not found.</p>;

    const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        brand,
        shippingInformation,
        images,

    } = productDetails;

    const finalPrice = Number((price * (1 - discountPercentage / 100)).toFixed(2));

    const isInCart = cart_items?.some(item => item.item_id === productId);


    function handleCartAction() {
        if (!isInCart) {
            const newItem = {
                item_id: productId,
                quantity: 1,
                title: productDetails.title,
                discount_price: finalPrice,
                brand: productDetails.brand,
                thumbnail: productDetails.images[0]

            };
            addItem(newItem);
        }
    }


    return (
        <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
            <button
                onClick={() => navigate(-1)} // 3. Go back one step
                className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 font-medium transition duration-150"
            >
                {/* Simple left arrow SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Home
            </button>

            <div className="bg-white p-6 md:p-10 rounded-xl">

                {/* Product Title and Brand */}
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-1">{title}</h1>
                    <p className="text-lg text-indigo-600 font-semibold">{brand}</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* === LEFT COLUMN: Image Gallery === */}
                    <div className="lg:w-1/2 space-y-4">

                        {/* Main Product Image (Thumbnail) */}
                        <div className="aspect-square overflow-hidden rounded-xl shadow-lg border border-gray-200">
                            <img
                                src={images[0] || ProductDetails.thumbnail} // Use the first image or thumbnail
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>

                        {/* Small Image Grid/Slider for other images */}
                        <div className="grid grid-cols-4 gap-3">
                            {images.slice(1, 5).map((imgUrl, index) => (
                                <div key={index} className="aspect-square overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-indigo-500">
                                    <img
                                        src={imgUrl}
                                        alt={`${title} view ${index + 2}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* === RIGHT COLUMN: Details & Purchase Info === */}
                    <div className="lg:w-1/2 space-y-6">

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold mb-2 text-gray-800">Product Overview</h2>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        {/* Price Block */}
                        <div className="border-y py-4 my-4 space-y-2">
                            <div className="flex items-center space-x-4">

                                {/* Discounted Price */}
                                <span className="text-5xl font-extrabold text-red-600">
                                    {formatCurrency(finalPrice)}
                                </span>

                                {/* Original Price (Strikethrough) */}
                                {discountPercentage > 0 && (
                                    <span className="text-2xl line-through text-gray-400">
                                        {formatCurrency(price)}
                                    </span>
                                )}
                            </div>

                            {/* Discount Badge */}
                            {discountPercentage > 0 && (
                                <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full inline-block">
                                    {discountPercentage}% OFF
                                </span>
                            )}
                        </div>

                        {/* Rating and Shipping */}
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-yellow-600">
                                ★ {rating}
                            </p>
                            <p className="text-gray-600 font-medium">
                                **Shipping:** {shippingInformation}
                            </p>
                        </div>

                        <div className="pt-4">

                            {isInCart ? (
                                <>
                                    <Modal>
                                        <Modal.Open name="delete-from-details">
                                            <Button
                                                type="primary"
                                                className="w-full text-lg font-semibold py-3 rounded-xl transition duration-300 shadow-md bg-red-600 hover:bg-red-700"
                                            >
                                                Delete from Cart
                                            </Button>
                                        </Modal.Open>

                                        <Modal.Window name="delete-from-details">
                                            <ConfirmDelete
                                                title={title}
                                                disabled={isDeleting}
                                                onConfirm={() => deleteItem(productId)}
                                            />
                                        </Modal.Window>
                                    </Modal>
                                </>
                            ) : (
                                
                                <Button
                                    type="primary"
                                    onClick={handleCartAction}
                                    disabled={isAdding}
                                    className="w-full text-lg font-semibold py-3 rounded-xl transition duration-300 shadow-md bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {isAdding ? 'Adding...' : 'Add to Cart'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;