import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';

import VideoCardForm from './VideoCardForm';
import VideoCard from './VideoCard';


import { getVideos, getAllVids } from '../../../redux/actions/videos';

const VideosContainer = ({ getVideos, getAllVids, videoState: { loading, videos } }) => {
    const fade = useSpring({ opacity: 1, from: { opacity: 0 }});
    const { category_id } = useParams();
    
    let [ newVideo, setNewVideo ] = useState([]);

    useEffect(() => {
        if (category_id === 'all-vids') {
            getAllVids();
            return;
        } 
        getVideos(category_id);
    }, [ category_id ])

    const renderVideoCardForms = () => {
        return newVideo.map((vid, index) => (
            <VideoCardForm key={index} setNewVideo={setNewVideo} />
        ));
    }

    return (
        <animated.div style={fade} className="item-container">
            { !loading && videos.map(video => (
                <VideoCard key={video._id} video={video} />
            ))}
            { newVideo.length > 0 && renderVideoCardForms() }
            { category_id !== 'all-vids' &&
                <div key={'add'} className="item-card" onClick={() => setNewVideo([...newVideo, 'new'])}>
                    <button>+</button>  
                </div>
            }
        </animated.div>
    )
}

const msp = state => ({
    videoState: state.videos
});

export default connect(msp, { getVideos, getAllVids })(VideosContainer);