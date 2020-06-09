import React from 'react';
import { useSpring, animated } from 'react-spring';

import NavBar from '../NavBar';
import VideosContainer from './VideosContainer';


const VideoLanding = () => {
    const move = useSpring({ marginRight: 0, from: { marginRight: -5000 }});
    
    return (
        <animated.div style={move}>
            <NavBar />
            <VideosContainer />
        </animated.div>
    )
}

export default VideoLanding;