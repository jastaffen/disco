import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import PublicLanding from './components/PublicLanding';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={PublicLanding} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
