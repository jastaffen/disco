import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


import Login from './auth/Login';
import SignUp from './auth/SignUp';

import Logo from '../images/logo.png';

const PublicLanding = ({ user: { loading, errors }}) => {
    const [ errs, setErrors ] = useState({});
    const [ signUp, setSignUp ] = useState(false);

    useEffect(() => {
        if (!loading && errors) {
            setErrors(errors);
        }
    }, [ loading, errors ]);


    const renderErrors = () => {

        if (typeof errs === 'string') return <li className="err-item">{errs}</li>

        return Object.keys(errs).map(err => (
            <li className="err-item" key={err}>{errs[err].properties.message}</li>
        ))
    }

    const handleLinkClick = () => {
        setSignUp(!signUp);
        setErrors({});
    }

    return (
        <div className="public-landing">
            <h1>WELCOME TO <img src={Logo} alt="disco logo" /></h1>
            <div className="auth-container">
                <div>
                    {signUp ? <SignUp /> : <Login /> }
                </div>
                <div>
                    <ul>
                        { !loading && errs && renderErrors() }
                    </ul>
                </div>
                <div className="auth-switch">
                    <h4>{signUp ? "Already have an account?" : 
                        "Don't have an account?" }
                            <button onClick={handleLinkClick}>
                                { signUp ? "Login!" : "Sign Up!" }
                            </button>
                    </h4>
                </div>
            </div>
        </div>
    )
}

const msp = state => ({
    user: state.user
});

export default connect(msp)(PublicLanding);