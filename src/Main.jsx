import React, { useContext } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Timer from './components/timer/timer.tsx';
import Login from './components/login/login';
import Settings from './components/settings/Settings';
import { Store } from './redux/Store';

export function Main() {

  const {state, dispatch } = useContext(Store);
  
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
          render={() => (<Settings />)}
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