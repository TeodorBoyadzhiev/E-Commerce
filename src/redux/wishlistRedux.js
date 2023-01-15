import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: [],
        quantity: 0
    },
    reducers: {
        addProductWishlist: (state, action) => {
            let productIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (productIndex !== -1) { return; }
            state.quantity += 1;
            state.products.push(action.payload);
        },
        removeProduct: (state, action) => {
            let productIndex = state.products.findIndex(product => product._id === action.payload);
            if (state.quantity === 0) { return; }
            state.quantity -= 1;
            state.products.splice(productIndex, 1);
        }
    }
});


export const { addProductWishlist, removeProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
