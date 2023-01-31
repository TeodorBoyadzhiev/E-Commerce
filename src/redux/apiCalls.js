import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux"

const BASE_URL = 'http://localhost:5000/api/auth';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL}/login`, user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
        console.log(err)
    }
}

export const logoutUser = async (dispatch, user) => {
    try {
        await axios
            .post(`${BASE_URL}/logout`, user)
            .then(() => dispatch(logout()))
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
            
    } catch (err) {
        console.log(err)
    }
}