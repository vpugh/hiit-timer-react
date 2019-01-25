import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Timer from './components/timer/timer';
import Login from './components/login/login';
import Settings from './components/settings/Settings';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Timer} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </main>
  );
};

export default Main;