import { GET_CATEGORIES, SELECTED_CATEGORY, CATEGORY_LOADING, CATEGORY_ERROR, 
        ADD_CATEGORY, UPDATE_CATEGORY } from '../actions/types';

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
        case ADD_CATEGORY:
            return {
                ...state,
                loading: false,
                categories: [...state.categories, payload]
            }
        case UPDATE_CATEGORY:  
            const updatedCategories = [...state.categories].map(category => {
                return category._id === payload._id ? payload : category;
            });
            return {
                ...state,
                loading: false,
                categories: updatedCategories
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