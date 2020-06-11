import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';


import { updateVideo, deleteVideo, selectVideo } from '../../../redux/actions/videos';

const VideoCard = ({ video, updateVideo, deleteVideo, selectVideo }) => {
    const move = useSpring({ marginRight: 0, from: { marginRight: -5000 }});
    const holder = video.title;
    const [ title, setTitle ] = useState(holder);
    const [ videoUrl, setVideoUrl ] = useState(video.videoUrl);
    const [ next, setNext ] = useState(false);
    const [ activeForm, setActiveForm ] = useState(false);

    const handleFormFocus = e => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleVideoUpdate = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!title) return;
        updateVideo({ title, videoUrl }, video._id);
        setTitle(title);
        setActiveForm(false);
    }

    const handleCategoryDelete = e => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete the video?')) {
            deleteVideo(video._id);
        }
    }

    const activateFormToggle = e => {
        e.preventDefault();
        e.stopPropagation();
        setActiveForm(!activeForm)
    }

    const handleNextClick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!title) return;
        setNext(!next);
    }

    return (
        <Link to={`v/${video._id}`} className={video.watched ? "item-card video-watched" : "item-card"} onClick={() => selectVideo(video._id)}>
            <div>
                <div className="time-code video-image" style={{backgroundImage: `url(${video.thumbnail.url})`}}>
                    <div className="top-right">
                        <button onClick={activateFormToggle}>
                            { activeForm ? 'Back' : 'Edit' }
                        </button>
                        <button onClick={handleCategoryDelete}>x</button>
                    </div>        
                </div>
                <div className="title">
                    { activeForm ? 
                        <form onSubmit={handleVideoUpdate}>
                            { !next ?
                                <div>
                                    <input className="card-input" type="text" value={title} onClick={handleFormFocus}
                                        placeholder="title..." onChange={(e) => setTitle(e.target.value)} />
                                    <button id="nav-input" onClick={handleNextClick}>URL {'>'}</button> 
                                </div> 
                                :
                                <animated.div style={move}>
                                    <div className="video-update-field">
                                        <input className="card-input" type="text" value={videoUrl} onClick={handleFormFocus}
                                            placeholder="video url..." onChange={(e) => setVideoUrl(e.target.value)} />
                                        <button onClick={handleVideoUpdate}>update</button>
                                    </div>
                                    <button id="nav-input" onClick={handleNextClick}>{'<'} Title</button>

                                </animated.div>
                            }
                        </form> 
                    : 
                    <h3>{video.title}</h3>
                }
                </div>
            </div>
        </Link>
    )
}

export default connect(null, { updateVideo, deleteVideo, selectVideo })(VideoCard);