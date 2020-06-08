import { LOGIN, SIGN_UP, GET_USER, USER_ERROR } from './types';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

const USER_ENDPOINT = "http://localhost:5000/api/users/";
const AUTH_ENDPOINT = "http://localhost:5000/api/auth/";
const config = { "Content-Type": "application/json", Accept: "application/json" };

export const getUser = () => async dispatch => {

    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }

    try {
        const res = await axios.get(AUTH_ENDPOINT);
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err
        });
    }
}

export const signUp = user => async dispatch => {
    try {
        const res = await axios.post(USER_ENDPOINT, user, config);
        if (res.data.errors) {
            dispatch({
                type: USER_ERROR,
                payload: res.data.errors
            })
            return;
        }
        localStorage.setItem('token', res.data.token);

        dispatch(getUser());

    } catch (err) {
        console.log(err.message);
        dispatch({
            type: USER_ERROR,
            payload: err
        })
    }
}

export const login = user => async dispatch => {
    try {
        const res = await axios.post(AUTH_ENDPOINT, user, config);
        if (res.data === 'Invalid credentials.') {
            dispatch({
                type: USER_ERROR,
                payload: res.data
            });
            return;
        }

        localStorage.setItem('token', res.data.token);
        
        dispatch(getUser());

    } catch (err) {
        console.log(err.message);
        dispatch({
            type: USER_ERROR,
            payload: err
        })
    }
}

