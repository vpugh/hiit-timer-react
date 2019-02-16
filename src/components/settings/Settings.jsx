import React, { Component } from 'react';
import './settings.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../../redux/actions/action-types';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseNumber: 1,
      restTime: '',
      workTime: '',
      rounds: '',
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleListedInput = this.handleListedInput.bind(this);
  }

  componentDidMount() {
    const { restTime, workTime, rounds } = this.props;
    this.setState({
      restTime,
      workTime,
      rounds,
    })
  }

  handleInput(ev) {
    if (/^-?\d*$/.test(ev.target.value) === true) {
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
      onUpdateTime,
    } = this.props;
    const {
      restTime,
      workTime,
      rounds,
    } = this.state;
    
    return (
      <div>
        <form>
          <h2>Settings</h2>
          <p>Time should be in seconds, ex: 1 min = 60s.</p>
          <div className="form-inputs">
            <label htmlFor="rounds">Rounds:</label>
            <input type="text" name="rounds" id="rounds" value={rounds} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="workoutTime">Workout Time:</label>
            <input type="text" name="workTime" id="workoutTime" value={workTime} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="rest">Rest Time:</label>
            <input type="text" name="restTime" id="rest" value={restTime} onChange={this.handleInput} />
          </div>
          <button type="button" className="btn" onClick={() => onUpdateTime(workTime, restTime, rounds)}>Save Timer</button>
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

const mapStateToProps = state => {
  return {
    workTime: state.workTime,
    restTime: state.restTime,
    rounds: state.rounds
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTime: (work, rest, rounds) => dispatch({ type: actionTypes.UPDATE_TIMER, workTime: work, restTime: rest, rounds: rounds })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);