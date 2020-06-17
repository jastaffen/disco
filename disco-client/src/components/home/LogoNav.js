import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';

const LogoNav = () => {
    const [ hovering, setHovering ] = useState(false);
    const { x } = useSpring({ from: { x: 0 }, x: hovering ? 1 : 0, config: { duration: 1000 } });

    
    return (
        <div onMouseOver={ () => setHovering(true) }>
            <Link to='/home'>
                { hovering ? 
                <animated.img src={Logo} alt="disco logo" style={{ transform: x
                .interpolate({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                }).interpolate(x => `scale(${x})`)}}/> 
            :
                <img src={Logo} alt="disco logo" />
            }
                
            </Link>
        </div>
    )


}

export default LogoNav;