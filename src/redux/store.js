import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import userReducer from './userRedux';
import wishlistRedux from './wishlistRedux';

export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
        wishlist: wishlistRedux
    }
});