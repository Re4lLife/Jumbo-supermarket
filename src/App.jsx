import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

import PrivateRoute from './components/PrivateRoute';
import AppLayOut from './components/AppLayOut';
import LayOutProvider from './contexts/LayOutContext';




const App = () => {
  return (
    <LayOutProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Home />} />

          <Route element={<AppLayOut />} >

            {/* //Public routes */}
            <Route path='/products' element={<Products />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<CheckOut />} />

            {/* Authenticated routes */}
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />

            <Route
              path="/orders/:id"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

          </Route>


          {/* Fallback 404 */}
          <Route path='*' element={<PageNotFound />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter >
    </LayOutProvider>
  );
};

export default App;


//Public pages like home, products, cart, and checkout can be accessed without authentication 
// — but checkout will require login before payment.