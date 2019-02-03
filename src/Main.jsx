import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Timer from './components/timer/timer';
import Login from './components/login/login';
import Settings from './components/settings/Settings';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restTime: 2,
      workoutTime: 4,
      rounds: 3,
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
              <Timer {...props} restTime={this.state.restTime} workoutTime={this.state.workoutTime} rounds={this.state.rounds} exercises={this.state.exercises} />
            )}
          />
          <Route
            exact
            path="/settings"
            render={(props) => (
              <Settings {...props} restTime={this.state.restTime} workoutTime={this.state.workoutTime} rounds={this.state.rounds} exercises={this.state.exercises} handleNumberInputs={this.handleNumberInputs} handleTextInputs={this.handleTextInputs} addExercise={this.addExercise} />
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