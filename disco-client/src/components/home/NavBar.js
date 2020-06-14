import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoNav from './LogoNav';



const NavBar = ({ userState: { user, loading } }) => {
    const [ hovering, setHovering ] = useState('Hi');
    return (
        <nav className="navbar">
            <LogoNav />
            <Link to="all-vids">
                All Videos
            </Link>
            <Link to="feed">
                Feed
            </Link>
            <button className="auth-nav" onMouseEnter={() => setHovering('Bye')} onMouseLeave={() => setHovering('Hi')}>
                { !loading && <h4>{hovering} {user.name}</h4> }

                <div>
                    Logout
                </div>
            </button>
        </nav>
    )
}


const msp = state => ({
    userState: state.user
})

export default connect(msp)(NavBar);