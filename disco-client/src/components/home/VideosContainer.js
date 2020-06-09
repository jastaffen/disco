import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import VideoCardForm from './VideoCardForm';
import VideoCard from './VideoCard';


import { getVideos } from '../../redux/actions/videos';

const VideosContainer = ({ getVideos, videoState: { loading, videos }}) => {
    const { category_id } = useParams();
    let [ newVideo, setNewVideo ] = useState([]);

    useEffect(() => {
        getVideos(category_id);
    }, [])

    const renderVideoCardForms = () => {
        return newVideo.map((vid, index) => (
            <VideoCardForm key={index} setNewVideo={setNewVideo} />
        ));
    }
    return (
        <div className="item-container">
            { !loading && videos.map(video => (
                <VideoCard key={video._id} video={video} />
            ))}
            { newVideo.length > 0 && renderVideoCardForms() }
            <div key={'add'} className="item-card" onClick={() => setNewVideo([...newVideo, 'new'])}>
                <button>+</button>  
            </div>
        </div>
    )
}

const msp = state => ({
    videoState: state.videos
});

export default connect(msp, { getVideos })(VideosContainer);