import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        products: [],
        quantity: 0
    },
    reducers: {
        addProductWishlist: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
        }
    }
});


export const { addProductWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
