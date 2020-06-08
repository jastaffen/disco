import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Redirect to="/" />
    }

    return <Route { ...rest } render={props => <Component {...props} />} />
}

export default PrivateRoute;