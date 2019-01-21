import React, { Component } from 'react';
import './settings.scss';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      restTime: '10',
      workout: '30',
      rounds: 3,
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(ev) {
    if (/^-?\d*$/.test(ev.target.value) === true) {
      this.setState({
        [ev.target.name]: ev.target.value,
      })
    }
  }

  render() {
    const {
      exercises,
      restTime,
      workout,
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
            <label htmlFor="workout">Workout Time:</label>
            <input type="text" name="workout" id="workout" value={workout} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="rest">Rest Time:</label>
            <input type="text" name="restTime" id="rest" value={restTime} onChange={this.handleInput} />
          </div>
          <div className="exercises">
            <h3>Exercises:</h3>
            <div className="form-inputs">
              <label htmlFor="exercises">Exercise {exercises.length + 1}:</label>
              <input type="text" name="exercises" id="exercises" placeholder={`Exercise ${exercises.length + 1}`} value={exercises} onChange={this.handleInput} />
              <button className="btn">Add Exercise</button>
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