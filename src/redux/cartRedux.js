import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        lastSeenProducts: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            let prodIndex = state.products.findIndex(product => (
                (
                    product._id === action.payload._id
                    && product.color === action.payload.color
                    && product.size === action.payload.size
                )
            ));

            if (prodIndex !== -1) {
                state.quantity += action.payload.quantity;
                state.products[prodIndex].quantity += action.payload.quantity;
                state.total += action.payload.quantity * action.payload.price;
                return;
            }

            state.quantity += action.payload.quantity;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        incrProdQuantity: (state, action) => {
            let prodIndex = state.products.findIndex(product => product._id === action.payload._id);
            if (action.payload.type === 'increase') {
                state.products[prodIndex].quantity += 1;
                state.quantity += 1;
                state.total += Number(state.products[prodIndex].price);
            } else {
                if (state.products[prodIndex].quantity > 1) {
                    state.products[prodIndex].quantity -= 1;
                    state.quantity -= 1;
                    state.total -= state.products[prodIndex].price;
                }
            }
        },
        addLastSeenProducts: (state, action) => {
            let productIndex = state.lastSeenProducts.findIndex(product => product._id === action.payload._id);

            if (productIndex === -1) {
                state.lastSeenProducts.unshift(action.payload);
            } else {
                let existingProduct = state.lastSeenProducts.splice(productIndex, 1);
                state.lastSeenProducts.unshift(...existingProduct);
            }

            // state.lastSeenProducts = [];
        },
        removeProduct: (state, action) => {
            let productIndex = state.products.findIndex(product => (
                (
                    product._id === action.payload._id
                    && product.size === action.payload.size
                    && product.size === action.payload.size
                )
            ));

            if (productIndex === -1) return;

            state.quantity -= state.products[productIndex].quantity;
            state.total -= state.products[productIndex].price * state.products[productIndex].quantity;
            state.products.splice(productIndex, 1);
        }
    }
});

export const { addProduct, incrProdQuantity, addLastSeenProducts, removeProduct } = cartSlice.actions
export default cartSlice.reducer;