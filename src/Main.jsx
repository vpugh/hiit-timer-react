import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Timer from './components/timer/timer.tsx';
import Login from './components/login/login';
import Settings from './components/settings/Settings';
import { connect } from 'react-redux';
import { Store } from './redux/Store';

export function Main() {

  const {state} = useContext(Store);
  const activeClass = (route) => {
    return location.pathname === route ? 'active' : null;
  }
  
  return (
    <main>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (<Timer {...state} />)}
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