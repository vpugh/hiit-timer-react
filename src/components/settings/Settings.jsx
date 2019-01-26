import React, { Component } from 'react';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseNumber: 1,
    }
    this.handleInput = this.handleInput.bind(this);
    this.addExercise = this.addExercise.bind(this);
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
    console.log(ev.target.name, ev.target.value);
    if (/^-?\d*$/.test(ev.target.value) === true) {
      this.setState({
        [ev.target.name]: ev.target.value,
      }, this.props.handleNumberInputs(ev.target.value, ev.target.name))
    }
    this.props.handleTextInputs(ev);
  }

  addExercise() {
    const { exercises, exerciseNumber } = this.state;
    this.setState({
      exercises: exercises.concat('new value'),
      exerciseNumber: exerciseNumber + 1,
    });
  }

  render() {
    const {
      exercises,
      restTime,
      workoutTime,
      rounds,
    } = this.props;
    
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
          <div className="exercises">
            <h3>Exercises:</h3>
            <div className="form-inputs">
              {exercises.map((exercise, index) => ( 
                <React.Fragment key={exercise}>
                <label htmlFor="exercises">Exercise {index + 1}:</label>
                <input type="text" name={exercise} id={exercise} placeholder={`Exercise ${exercises.length + 1}`} value={exercises[index]} onChange={(e) => this.handleInput(e)} />
                </React.Fragment>
              ))}
              <button className="btn" onClick={this.addExercise} type="button">Add Exercise</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;