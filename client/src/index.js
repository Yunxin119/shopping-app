import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 } from 'react-router-dom'
 import { PayPalScriptProvider } from '@paypal/react-paypal-js';
 import { Provider } from 'react-redux';
 import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/bootstrap.custom.css'
import './assets/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Shipping from './screens/Shipping';
import PrivateRoute from './components/PrivateRoute'
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import Profile from './screens/Profile';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route index={true} path='/product/:id' element={<ProductDetail />} />
      <Route index={true} path='/cart' element={<Cart />} />
      <Route index={true} path='/login' element={<Login />} />
      <Route index={true} path='/register' element={<Register />} />
    
      <Route path='' element={<PrivateRoute />}>
        <Route index={true} path='/shipping' element={<Shipping />} />
        <Route index={true} path='/payment' element={<Payment />} />
        <Route index={true} path='/placeorder' element={<PlaceOrder />} />
        <Route index={true} path='/order/:id' element={<Order />} />
        <Route index={true} path='/profile' element={<Profile />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>

    </Provider>
  </React.StrictMode>
);


reportWebVitals();
