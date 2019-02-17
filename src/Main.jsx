import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Timer from './components/timer/timer';
import Login from './components/login/login';
import Settings from './components/settings/Settings';
import { connect } from 'react-redux';
import * as actionTypes from './redux/actions/action-types';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  activeClass(route) {
    return location.pathname === route ? 'active' : null;
  }
  
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Timer {...props} />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <Settings {...props} handleNumberInputs={this.handleNumberInputs} handleTextInputs={this.handleTextInputs} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} />
            )}
          />
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    workTime: state.time.workTime,
    restTime: state.time.restTime,
    rounds: state.time.rounds
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTimer: () => dispatch({ type: actionTypes.FETCH_TIMER }),
    onFetchSession: () => dispatch({ type: actionTypes.FETCH_SESSION }),
    onFetchSessions: () => dispatch({ type: actionTypes.FETCH_SESSIONS }),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));