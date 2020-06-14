import React from 'react';
import { useSpring, animated } from 'react-spring';

import NavBar from '../NavBar';
import VideosContainer from './VideosContainer';


const VideoLanding = () => {
    const fade = useSpring({ opacity: 1, 
        from: { opacity: 0 }, 
        config: { duration: 1000 }
    });
    
    return (
        <animated.main style={fade}>
            <NavBar />
            <VideosContainer />
        </animated.main>
    )
}

export default VideoLanding;