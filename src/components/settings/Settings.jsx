import React, { Component } from 'react';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseNumber: 1,
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleListedInput = this.handleListedInput.bind(this);
  }

  handleInput(ev) {
    console.log(ev.target.name, ev.target.value);
    if (/^-?\d*$/.test(ev.target.value) === true) {
      console.log(ev.target.name);
      this.setState({
        [ev.target.name]: ev.target.value,
      }, this.props.handleNumberInputs(ev.target.value, ev.target.name))
    }
  }

  handleListedInput(ev) {
    const { handleTextInputs } = this.props;
    const index = ev.target.getAttribute('data-index');
    handleTextInputs(ev.target.value, index);
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
                <div key={exercise + index} style={{ margin: '10px 0' }}>
                <label htmlFor="exercises" style={{ marginBottom: '6px' }}>Exercise {index + 1}:</label>
                <input type="text" name={exercise.name} id={exercise.name} placeholder={`Exercise ${index + 1}`} value={exercises[index].name} data-index={index} onChange={this.handleListedInput} />
                </div>
              ))}
              <button className="btn" onClick={this.props.addExercise} type="button">Add Exercise</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;