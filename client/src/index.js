import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 } from 'react-router-dom'
 import { Provider } from 'react-redux';
 import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/bootstrap.custom.css'
import './assets/index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route index={true} path='/product/:id' element={<ProductDetail />} />
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
