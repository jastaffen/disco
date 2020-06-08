import { GET_CATEGORIES, SELECTED_CATEGORY, CATEGORY_LOADING, CATEGORY_ERROR } from '../actions/types';
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