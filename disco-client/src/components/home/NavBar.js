import React from 'react';
import { connect } from 'react-redux';

import Logo from '../../images/logo.png';


const NavBar = ({ userState: { user, loading } }) => (
    <nav className="navbar">
        <div>
            <img src={Logo} alt="disco logo" />
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