import React from 'react';
import { useSpring, animated } from 'react-spring';

import NavBar from './home/NavBar';
import CategoriesContainer from './home/CategoriesContainer';


const PrivateLanding = () => {
    const fadeIn = useSpring({opacity: 1, from: { opacity: 0 }});
    return (
        <animated.main style={fadeIn}>
            <NavBar />
            <CategoriesContainer />
        </animated.main>
    )
}


export default (PrivateLanding);