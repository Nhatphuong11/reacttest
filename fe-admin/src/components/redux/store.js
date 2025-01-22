import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/authSlice';
import userReducer from '../redux/userSlice';
import categoryReducer from "../redux/categorySlice";
import productReducer from '../redux/productSlice';  
import postReducer from '../redux/postSlice'; 
import orderReducer from '../redux/orderSlice'; 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    post: postReducer,  
    orders: orderReducer,
    category: categoryReducer,
  }
});

