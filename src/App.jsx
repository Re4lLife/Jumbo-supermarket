import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckOutPage from './pages/CheckOutPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import ProfilePage from './pages/ProfilePage';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';

import PrivateRoute from './components/PrivateRoute';
import AppLayOut from './components/AppLayOut';
import LayOutProvider from './contexts/LayOutContext';
import LoginForm from './features/authentication/LoginForm';
import SignupForm from './features/authentication/SignupForm';
import CategoryProvider from './contexts/CategoryContext';



export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
})



const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LayOutProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Routes>

              <Route path='/' element={<HomePage />} />

              <Route element={<AppLayOut />} >

                {/* //Public routes */}
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                <Route path='/checkout' element={<CheckOutPage />} />

                {/* Authenticated routes */}
                <Route
                  path='/cart'
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <OrdersPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/orders/:id"
                  element={
                    <PrivateRoute>
                      <OrderDetailsPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />

              </Route>



              <Route path='/auth' element={<LoginPage />} >
                <Route path='sign-in' element={<LoginForm />} />
                <Route path='sign-up' element={<SignupForm />} />
              </Route>

              {/* Fallback 404 */}
              <Route path='*' element={<PageNotFound />} />

            </Routes>
          </BrowserRouter >
        </CategoryProvider>
      </LayOutProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '15px' }}
        toastOptions={{
          success: {
            duration: 3000,

          },
          error: {
            duration: 3000,

          },
          style: {
            fontSize: '17px',
            padding: '16px 25px',
            maxWidth: '510px'

          }
        }} />
    </QueryClientProvider>
  );
};

export default App;


