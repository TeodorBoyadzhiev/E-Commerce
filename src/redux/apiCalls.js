import axios from "axios";
import { loginFailure, loginStart, loginSuccess, logout, setNewUserData } from "./userRedux";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';

const axiosJWT = axios.create();
const BASE_URL = 'http://localhost:5000/api/auth';

axiosJWT.interceptors.request.use(async (config) => {
    const user = useSelector(state => state.user.currUser);
    const dispatch = useDispatch();

    const decodedToken = jwt_decode(user.accessToken);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken(dispatch, user);
        config.headers["authorization"] = "Bearer " + data.accessToken;

        dispatch(setNewUserData({ ...user, accessToken: data.accessToken, refreshToken: data.refreshToken }));
    }

    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

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

export const refreshToken = async (dispatch, user) => {
    try {
        const res = await axios.post(`${BASE_URL}/refresh`, { token: user.refreshToken });
        dispatch(setNewUserData({ ...user, accessToken: res.accessToken, refreshToken: res.refreshToken }));

        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const logoutUser = async (dispatch, user) => {
    try {
        await axios
            .post(`${BASE_URL}/logout`, { token: user.refreshToken })
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