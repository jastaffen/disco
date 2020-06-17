import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import LogoNav from './LogoNav';



const NavBar = ({ userState: { user, loading } }) => {
    const [ hovering, setHovering ] = useState('Hi');

    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload()
        if (!localStorage.getItem('token')) {
            return history.push('/')
        }
    }

    
    return (
        <nav className="navbar">
            <LogoNav />
            <Link to="all-vids">
                All Videos
            </Link>
            <Link to="feed">
                Feed
            </Link>
            <button className="auth-nav" onMouseEnter={() => setHovering('Bye')} 
            onMouseLeave={() => setHovering('Hi')} onClick={logout}>
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