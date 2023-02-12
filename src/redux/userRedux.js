import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currUser = action.payload;
            state.error = false;
            // localStorage.removeItem('last_seen_product_ids');
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state, action) => {
            state.currUser = null;
            // localStorage.removeItem('last_seen_product_ids');

        },
        setNewUserData: (state, action) => {
            state.currUser = action.payload;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, setNewUserData } = userSlice.actions
export default userSlice.reducer;