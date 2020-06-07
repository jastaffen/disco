import { LOGOUT, GET_USER, EDIT_USER, DELETE_USER, USER_ERROR, USER_LOADING } from '../actions/types';

const initialState = {
    user: {},
    loading: true,
    errors: []
}

export default function( state = initialState, action ) {
    const { type, payload } = action;
    switch(type) {
        case GET_USER:
            return {
                user: payload,
                loading: false
            }
        case EDIT_USER:
            return {
                user: payload,
                loading: false
            }
        case USER_LOADING: 
            return {
                ...state,
                loading: true
            }
        case USER_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false
            }
        case LOGOUT:
        case DELETE_USER:
            return state = initialState
        default: 
            return state
    }
}