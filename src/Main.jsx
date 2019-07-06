import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Timer from './components/timer/timer.tsx';
import Login from './components/login/login';
import Settings from './components/settings/Settings';

export function Main() {
  
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          component={Timer}
        />
        <Route
          path="/settings"
          component={Settings}
        />
        <Route
          path="/login"
          component={Login}
        />
      </Switch>
    </main>
  );
}

export default withRouter(Main);