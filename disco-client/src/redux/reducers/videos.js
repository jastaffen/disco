import { GET_VIDEOS, SELECT_VIDEO, ADD_VIDEO, EDIT_VIDEO, DELETE_VIDEO, VIDEO_LOADING, VIDEO_ERROR } from '../actions/types';

const initialState = {
    videos: [],
    selectedVideo: {},
    nowPlaying: false,
    loading: true,
    errors: []
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case GET_VIDEOS:
            return {
                ...state,
                videos: payload,
                loading: false
            }
        case SELECT_VIDEO:
            return {
                ...state,
                selectedVideo: payload,
                loading: false
            }
        case ADD_VIDEO:
            return {
                ...state,
                videos: [...state.videos, payload],
                loading: false
            }
        case EDIT_VIDEO:
            const updatedVideos = [...state.videos].map(video => {
                return video._id === payload._id ? payload : video
            });
            return {
                ...state,
                loading: false,
                videos: updatedVideos
            }
        case DELETE_VIDEO:
            const videosWithoutDeleted = [...state.videos].filter(video => video._id !== payload._id);
            return {
                ...state,
                videos: videosWithoutDeleted,
                loading: false
            }
        case VIDEO_LOADING:
            return {
                ...state,
                loading: true
            }
        case VIDEO_ERROR:
            return {
                ...state,
                errors: payload
            }
        default:
            return state
    }
}