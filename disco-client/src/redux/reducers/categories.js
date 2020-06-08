import { GET_CATEGORIES, SELECTED_CATEGORY, CATEGORY_LOADING, CATEGORY_ERROR } from '../actions/types';

const initialState = {
    categories: [],
    errors: [],
    loading: true,
    selectedCategory: {}
}

export default function( state = initialState, action ) {
    const { type, payload } = action;
    switch(type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case SELECTED_CATEGORY: 
            return {
                ...state,
                selectedCategory: payload,
                loading: false
            }
        case CATEGORY_LOADING:
            return {
                ...state,
                loading: true
            }
        case CATEGORY_ERROR:
            return {
                ...state,
                errors: payload
            }
        default:
            return state
    }
}