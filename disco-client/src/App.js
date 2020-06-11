import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';

import PublicLanding from './components/PublicLanding';
import PrivateLanding from './components/PrivateLanding';
import VideoLanding from './components/home/videos/VideoLanding';
import VideoStreamLanding from './components/home/videos/VideoStreamLanding';


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
          <PrivateRoute exact path="/:category_id" component={VideoLanding} />
          <PrivateRoute exact path="/v/:video_id" component={VideoStreamLanding} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
