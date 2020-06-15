import { GET_VIDEOS, SELECT_VIDEO, ADD_VIDEO, EDIT_VIDEO, DELETE_VIDEO, VIDEO_LOADING, VIDEO_ERROR } from '../actions/types';
import axios from 'axios';

export const getVideos = (categoryId) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/videos/category/${categoryId}`);
        dispatch({
            type: GET_VIDEOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const addVideo = (video, categoryId) => async dispatch => {
    try {
        dispatch({
            type: VIDEO_LOADING
        });
        const res = await axios.post(`http://localhost:5000/api/videos/${categoryId}`, video);
        dispatch({
            type: ADD_VIDEO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        })
    }
}

export const updateVideo = (video, videoId) => async dispatch => {
    try {
        dispatch({
            type: VIDEO_LOADING
        });
        const res = await axios.patch(`http://localhost:5000/api/videos/${videoId}`, video);
        dispatch({
            type: EDIT_VIDEO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const deleteVideo = videoId => async dispatch => {
    try {
        dispatch({
            type: VIDEO_LOADING
        });
        const res = await axios.delete(`http://localhost:5000/api/videos/${videoId}`);
        dispatch({
            type: DELETE_VIDEO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const selectVideo = videoId => async dispatch => {
    try {
        dispatch({
            type: VIDEO_LOADING
        });
        const res = await axios.get(`http://localhost:5000/api/videos/${videoId}`);
        dispatch({
            type: SELECT_VIDEO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const toggleWatched = videoId => async dispatch => {
    try {
        const res = await axios.patch(`http://localhost:5000/api/videos/watched/${videoId}`);
        dispatch({
            type: SELECT_VIDEO,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        })
    }
}

export const recordPause = (videoId, pausedAt) => async dispatch => {
    try {
        await axios.patch(`http://localhost:5000/api/videos/paused/${videoId}`, { pausedAt });
        // dispatch({
        //     type: SELECT_VIDEO,
        //     payload: res.data
        // });
    } catch (err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const hasWatched = categoryId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/videos/has-watched/${categoryId}`);
        return res.data;
    } catch(err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}

export const getAllVids = () => async dispatch => {
    try {
        dispatch({
            type: VIDEO_LOADING
        });
        const res = await axios.get('http://localhost:5000/api/videos');
        dispatch({
            type: GET_VIDEOS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: VIDEO_ERROR,
            payload: err
        });
    }
}