import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';

import PublicLanding from './components/PublicLanding';
import PrivateLanding from './components/PrivateLanding';

import PrivateRoute from './routing/PrivateRoute';
import { getUser } from './redux/actions/user';

import './App.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

const App = () => {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.dispatch(getUser());
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={PublicLanding} />
          <PrivateRoute exact path="/home" component={PrivateLanding} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
