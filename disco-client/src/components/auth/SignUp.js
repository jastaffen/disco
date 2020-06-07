import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import FormField from '../form/FormField';

const SignUp = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [ password2, setPassword2 ] = useState('');
    const [ show, setShow ] = useState(false);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
 
    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <FormField type='text' name="name" value={user.name} 
                    handleChange={handleChange} required />
                <FormField type="text" name="email" value={user.email}
                    handleChange={handleChange} pattern={/\S+@\S+\.\S+/} required />
                <FormField type={ !show ? 'password' : 'text' } name="password" value={user.password}
                    handleChange={handleChange} minLength={6} required />
                <FormField type='password' name="confirm password" value={password2}
                    handleChange={(e) => setPassword2(e.target.value)} minLength={6} required />
            </div>
            
        </div>
    )
}

export default SignUp;