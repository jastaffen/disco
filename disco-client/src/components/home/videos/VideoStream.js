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
            start: selectedVideo.pausedAt,
            color: 'white'
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
            setProgressWidth((selectedVideo.pausedAt / selectedVideo.videoLength) * 100);
        }
    }, [ loading, selectedVideo ]);


    useEffect(() => {
        if (progressWidth > 100 || selectedVideo.watched === true) {
            setWatchedDisplay(true);
        }
    }, [ progressWidth, selectedVideo.watched ]);

    const handlePause = (e) => {
        e.target.pauseVideo();
        e.target.isVideoInfoVisible(true);
        recordPause(selectedVideo._id, Math.floor(e.target.playerInfo.currentTime));
        clearInterval(vidProgress);
    }

    const handlePlay = e => {
        vidProgress = setInterval(() => {
            setProgressWidth((Math.floor(e.target.playerInfo.currentTime) / selectedVideo.videoLength) * 100)
        }, 1000);
    }
    return(
        <div className="video-stream">
            { !loading && 
                <YouTube videoId={id} opts={opts} onPause={handlePause} onPlay={handlePlay}
                 onReady={(e) => e.target.playVideo()}
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