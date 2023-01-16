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
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state, action) => {
            state.currUser = null;
        },
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer;