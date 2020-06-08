import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import FormField from '../form/FormField';

import { login } from '../../redux/actions/user';

const Login = ({ login }) => {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });
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

    const { email, password } = user;

    const handleSubmit = async e => {
        e.preventDefault();
        if (!email || !password) return alert('empty fields.');
        await login(user);
        if (localStorage.getItem('token')) {
            return history.push('/home');
        }
    }

    return (
        <div>
            <FormField type="text" name="email" value={email} 
                handleChange={handleChange} required />
            <FormField type={!show ? "password" : "text"} name="password" value={password}
                handleChange={handleChange} required />
            
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default connect(null, { login })(Login);