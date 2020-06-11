import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Logo from '../../images/logo.png';


const NavBar = ({ userState: { user, loading } }) => (
    <nav className="navbar">
        <div>
            <Link to="/home">
                <img src={Logo} alt="disco logo" />
            </Link>
        </div>
                
        { !loading && <h2>Hi {user.name}</h2> }

        <div>
            <button>Logout</button>
        </div>
    </nav>
)

const msp = state => ({
    userState: state.user
})

export default connect(msp)(NavBar);