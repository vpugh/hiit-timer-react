import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Timer from './components/timer/timer';
import Login from './components/login/login';
import Settings from './components/settings/Settings';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restTime: 12,
      workoutTime: 22,
      rounds: 4,
      exercises: [],
    }
    this.handleNumberInputs = this.handleNumberInputs.bind(this);
  }

  handleNumberInputs(value, name) {
    this.setState({
      [name]: value,
    }, null);
  }
  
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Timer {...props} restTime={this.state.restTime} workoutTime={this.state.workoutTime} rounds={this.state.rounds} exercises={this.state.exercises} />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <Settings {...props} restTime={this.state.restTime} workoutTime={this.state.workoutTime} rounds={this.state.rounds} exercises={this.state.exercises} handleNumberInputs={this.handleNumberInputs} />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} restTime={this.state.restTime} workoutTime={this.state.workoutTime} rounds={this.state.rounds} exercises={this.state.exercises} />
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default Main;