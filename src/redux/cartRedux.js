import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        incrProdQuantity: (state, action) => {
            if (action.payload === 'increase') {
                state.quantity += 1;
            } else {
                state.quantity -= 1;
            }
        },
        removeProduct: (state, action) => {
            let productIndex = state.products.findIndex(product => product._id === action.payload);
            state.quantity -= 1;
            state.total -= state.products[productIndex].price * state.products[productIndex].quantity;
            state.products.splice(productIndex, 1);
        }
    }
});

export const { addProduct, incrProdQuantity, removeProduct } = cartSlice.actions
export default cartSlice.reducer;