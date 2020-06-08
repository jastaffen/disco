import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import FormField from '../form/FormField';

import { signUp } from '../../redux/actions/user';

const SignUp = ({ signUp }) => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [ password2, setPassword2 ] = useState('');
    const [ show, setShow ] = useState(false);
    const history = useHistory();

    if (localStorage.getItem('token')) {
        return <Redirect to="/home" />
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const { name, email, password } = user;

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            return alert('passwords do not match');
        }
        await signUp(user);
        if (localStorage.getItem('token')) {
            history.push('/home');
        }
    }
 
    return (
        <div>
            <h2>Sign Up</h2>
            <div>
                <FormField type='text' name="name" value={name} 
                    handleChange={handleChange} required />
                <FormField type="text" name="email" value={email}
                    handleChange={handleChange} pattern={/\S+@\S+\.\S+/} required />
                <FormField type={ !show ? 'password' : 'text' } name="password" value={password}
                    handleChange={handleChange} minLength={6} required />
                <FormField type='password' name="confirm password" value={password2}
                    handleChange={(e) => setPassword2(e.target.value)} minLength={6} required />
                <button onClick={handleSubmit}>Sign Up!</button>
            </div>
        </div>
    )
}

export default connect(null, { signUp })(SignUp);