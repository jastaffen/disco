import { GET_CATEGORIES, SELECTED_CATEGORY, CATEGORY_LOADING, 
    CATEGORY_ERROR, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../actions/types';
    
import axios from 'axios';

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/categories');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: err
        });
    }
}

export const addCategory = title => async dispatch => {
    try {
        dispatch({
            type: CATEGORY_LOADING
        });
        const res = await axios.post('http://localhost:5000/api/users/category', { title });
        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: err
        });
    }
}

export const updateCategory = (title, id) => async dispatch => {
    try {
        dispatch({
            type: CATEGORY_LOADING
        });
        const res = await axios.patch(`http://localhost:5000/api/categories/${id}`, { title });
        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: err
        });
    }
}

export const deleteCategory = id => async dispatch => {
    try {
        dispatch({
            type: CATEGORY_LOADING
        });
        const res = await axios.delete(`http://localhost:5000/api/categories/${id}`);
        dispatch({
            type: DELETE_CATEGORY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORY_ERROR,
            payload: err
        });
    }
}