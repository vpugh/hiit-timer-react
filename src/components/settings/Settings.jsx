import React, { Component } from 'react';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      restTime: '10',
      workoutTime: '30',
      rounds: 3,
    }
    this.handleInput = this.handleInput.bind(this);
    this.addExercised = this.addExercised.bind(this);
  }

  componentDidMount() {
    const { restTime, workoutTime, rounds, exercises } = this.props;
    if (restTime) { this.setState({ restTime })}
    if (workoutTime) { this.setState({ workoutTime})}
    if (rounds) { this.setState({ rounds })}
    if (exercises) { this.setState({ exercises })}
  }

  componentDidUpdate(prevProps) {
    const { restTime, workoutTime, rounds, exercises } = this.props;
    if (prevProps.rounds !== this.state.rounds) { this.setState({ rounds }) }
    if (prevProps.restTime !== this.state.restTime) { this.setState({ restTime }) }
    if (prevProps.workoutTime !== this.state.workoutTime) { this.setState({ workoutTime }) }
    if (prevProps.exercises !== this.state.exercises) { this.setState({ exercises }) }
  }

  handleInput(ev) {
    if (/^-?\d*$/.test(ev.target.value) === true) {
      this.setState({
        [ev.target.name]: ev.target.value,
      }, this.props.handleNumberInputs(ev.target.value, ev.target.name))
    }
  }

  addExercised() {
    const { exercises } = this.state;
    const arr = [...exercises];
    arr.push({ exercises: ''});
    this.setState({
      ...exercises,
      exercise: arr,
    })
  }

  render() {
    const {
      exercises,
      restTime,
      workoutTime,
      rounds,
    } = this.state;
    
    return (
      <div>
        <form>
          <h2>Settings</h2>
          <p>Time should be inputed in seconds, ex: 1 min = 60 secs.</p>
          <div className="form-inputs">
            <label htmlFor="rounds">Rounds:</label>
            <input type="text" name="rounds" id="rounds" value={rounds} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="workoutTime">Workout Time:</label>
            <input type="text" name="workoutTime" id="workoutTime" value={workoutTime} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="rest">Rest Time:</label>
            <input type="text" name="restTime" id="rest" value={restTime} onChange={this.handleInput} />
          </div>
          {console.log(this.state.exercises, this.state.exercise)}
          <div className="exercises">
            <h3>Exercises:</h3>
            <div className="form-inputs">
              <label htmlFor="exercises">Exercise {exercises.length + 1}:</label>
              <input type="text" name="exercises" id="exercises" placeholder={`Exercise ${exercises.length + 1}`} value={exercises} onChange={this.handleInput} />
              <button className="btn" onClick={this.addExercised} type="button">Add Exercise</button>
            </div>
          </div>
        </form>
        {/* <p>Input: Number of Rounds</p>
        <p>Input: Different Exercises</p>
        <p>Input: Workout Time</p>
        <p>Input: Rest Time</p> */}
      </div>
    );
  }
}

export default Settings;