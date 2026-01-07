import React from 'react';
import HeaderMain from '../components/HeaderMain';

const HomePage = () => {
  // Shared style for the "blended" edge effect
  const blendedImageStyle = {
    maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
  };

  return (
    <div className="bg-white min-h-screen">
      <HeaderMain />


      <section className="text-center py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-yellow-800 mb-4">
          BUY FROM THE COMFORT OF YOUR HOME.
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Let's come to you. Let's bring it to your doorstep.
        </p>
      </section>


      {/* Add max-w-6xl so it has room to grow on big screens */}
      <div className="max-w-6xl mx-auto px-6 space-y-24 pb-20 w-full">

        {/* Row 1: Use justify-between to spread content as width increases */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/products.jpeg"
              alt="products"
              style={blendedImageStyle}
              className="w-64 h-64 md:w-80 md:h-80 object-cover"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">
              We ensure every delivery meets our <span className="text-yellow-800">"comfort and quality"</span> standard.
            </p>
          </div>
        </div>

        {/* Row 2: Reversed */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-right">
            <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed">
              Your items are handled with the <span className="text-yellow-800">utmost care</span> until they reach you.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/jumbo market.jpeg"
              alt="jumbo market building"
              style={blendedImageStyle}
              className="w-64 h-64 md:w-80 md:h-80 object-cover"
            />
          </div>
        </div>
      </div>

      <footer className="py-10 border-t border-gray-100 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Jumbo Market. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;