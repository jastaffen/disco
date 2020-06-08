import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';


import Login from './auth/Login';
import SignUp from './auth/SignUp';

const PublicLanding = ({ user: { loading, errors }}) => {
    const [ errs, setErrors ] = useState({});
    const [ signUp, setSignUp ] = useState(false);

    useEffect(() => {
        if (!loading && errors) {
            setErrors(errors);
        }
    }, [ loading, errors ]);


    const renderErrors = () => {

        if (typeof errs === 'string') return <li>{errs}</li>

        return Object.keys(errs).map(err => (
            <li key={err}>{errs[err].properties.message}</li>
        ))
    }

    const handleLinkClick = () => {
        setSignUp(!signUp);
        setErrors({});
    }

    return (
        <div>
            <h1>WELCOME TO DISCO</h1>
            <div>
                {signUp ? <SignUp /> : <Login /> }
            </div>
            <div>
                <ul>
                    { !loading && errs && renderErrors() }
                </ul>
            </div>
            <div>
                <h4>{signUp ? "Already have an account?" : 
                    "Don't have an account?" }
                        <button onClick={handleLinkClick}>
                            { signUp ? "Login!" : "Sign Up!" }
                        </button>
                </h4>
            </div>
        </div>
    )
}

const msp = state => ({
    user: state.user
});

export default connect(msp)(PublicLanding);