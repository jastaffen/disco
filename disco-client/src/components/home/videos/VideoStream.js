import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import YouTube from 'react-youtube';

import { toggleWatched, recordPause } from '../../../redux/actions/videos';

const VideoStream = ({ videoState: { loading, selectedVideo }, toggleWatched, recordPause }) => {
    const [ id, setId ] = useState('');
    const opts = {
        height: '420',
        width: '560',
        playerVars: {
            start: selectedVideo.pausedAt
        }
      };
    
    let vidProgress;
    
    const [ progressWidth, setProgressWidth ] = useState(0);
    const [ watchedDisplay, setWatchedDisplay ] = useState(false);

    useEffect(() => {
        let videoArr;
        if (!loading) {
            videoArr = selectedVideo.videoUrl.split('v=');
            setId(videoArr[1]);
        }
    }, [ selectedVideo, loading ]);


    useEffect(() => {
        if (progressWidth > 100 || selectedVideo.watched === true) {
            setWatchedDisplay(true);
        }
    }, [ progressWidth, selectedVideo.watched ]);

    const handlePause = (e) => {
        recordPause(selectedVideo._id, e.target.playerInfo.currentTime);
        clearInterval(vidProgress);
    }

    const handlePlay = e => {
        vidProgress = setInterval(() => {
            setProgressWidth((e.target.playerInfo.currentTime / selectedVideo.videoLength) * 100)
        }, 1000);
    }
    return(
        <div className="video-stream">
            { !loading && 
                <YouTube videoId={id} opts={opts} onPause={handlePause} onPlay={handlePlay}
                 />
            }
            <div className="progress-bar">
                <div style={{width: `${progressWidth}%`}} className="progress"></div>
            </div>

            {watchedDisplay && (
                <div className="watched">
                    <button onClick={() => toggleWatched(selectedVideo._id)}>{selectedVideo.watched ? 'Watched!' : 'Watched?'}</button>
                </div>
            )}
        </div>
    )
}

const msp = state => ({
    videoState: state.videos
});

export default connect(msp, { toggleWatched, recordPause })(VideoStream);