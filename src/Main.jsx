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
    this.state = {
      exercises: [{
        name: 'Squats'
      }],
    }
    this.handleNumberInputs = this.handleNumberInputs.bind(this);
    this.handleTextInputs = this.handleTextInputs.bind(this);
    this.addExercise = this.addExercise.bind(this);
  }

  handleNumberInputs(value, name) {
    this.setState({ [name]: value }, null);
  }

  handleTextInputs(value, index) {
    const { exercises } = this.state;
    const name = 'name';
    [...exercises][index][name] = value;
    this.forceUpdate();
  }

  addExercise() {
    const { exercises } = this.state;
    const newEx = exercises.concat({ name: ''});
    this.setState({ exercises: newEx }, null);
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
              <Timer {...props} exercises={this.state.exercises} />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <Settings {...props} exercises={this.state.exercises} handleNumberInputs={this.handleNumberInputs} handleTextInputs={this.handleTextInputs} addExercise={this.addExercise} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} exercises={this.state.exercises} />
            )}
          />
        </Switch>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    workTime: state.workTime,
    restTime: state.restTime,
    rounds: state.rounds
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTimer: () => dispatch({ type: actionTypes.FETCH_TIMER }),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));