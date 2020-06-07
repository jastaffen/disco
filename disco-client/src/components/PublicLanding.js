import React from 'react';
import { Route } from 'react-router-dom';

import SignUp from './auth/SignUp';

const PublicLanding = () => {
    return (
        <div>
            <h1>WELCOME TO DISCO</h1>
            <div>
                <SignUp />
            </div>
        </div>
    )
}

export default PublicLanding;