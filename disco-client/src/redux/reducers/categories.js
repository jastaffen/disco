import { 
    GET_CATEGORIES, SELECT_CATEGORY, CATEGORY_LOADING, 
    CATEGORY_ERROR, ADD_CATEGORY, UPDATE_CATEGORY, 
    DELETE_CATEGORY, GET_SUBCATEGORIES } from '../actions/types';

const initialState = {
    categories: [],
    errors: [],
    loading: true,
    selectedCategory: {},
    subCategories: []
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
        case SELECT_CATEGORY: 
            return {
                ...state,
                selectedCategory: payload,
                loading: false
            }
        case DELETE_CATEGORY:
            const categoriesWithoutDeleted = [...state.categories].filter(category => category._id !== payload._id);
            return {
                ...state,
                loading: false,
                categories: categoriesWithoutDeleted
            }
        case GET_SUBCATEGORIES:
            return {
                ...state,
                loading: false,
                subCategories: payload
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