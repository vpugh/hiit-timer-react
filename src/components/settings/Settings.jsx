import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      exercises: '',
      saving: false,
      typing: false,
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleListedInput = this.handleListedInput.bind(this);
    this.showSavingStatus = this.showSavingStatus.bind(this);
    this.typingFlagOn = this.typingFlagOn.bind(this);
    this.typingFlagOn = this.typingFlagOn.bind(this);
  }

  componentDidMount() {
    const { restTime, workTime, rounds, exercises, onFetchSession } = this.props;
    onFetchSession();
    this.setState({
      restTime,
      workTime,
      rounds,
      exercises,
    })
  }

  componentDidUpdate(prevProps) {
    const { onFetchSession, exercises } = this.props;
    if (prevProps.exercises !== exercises) {
      this.setState({
        exercises,
      });
      onFetchSession();
    }
  }

  handleInput(ev) {
    if (/^-?\d*$/.test(ev.target.value) === true) {
      this.setState({
        [ev.target.name]: ev.target.value,
      })
    }
  }

  handleListedInput(ev) {
    const { exercises } = this.state;
    const { onUpdateExercise } = this.props;
    const { value } = ev.target;
    const index = ev.target.getAttribute('data-index');
    const name = 'name';
    [...exercises][index][name] = value;
    this.forceUpdate();
    setTimeout(() => {
      onUpdateExercise(value);
      this.showSavingStatus();
    }, 2500);
  }

  showSavingStatus() {
    this.setState({ saving: true }, null);
    setTimeout(() => {
      this.setState({ saving: false });
      console.log('saving');
    }, 1000);
  }

  typingFlagOn() {
    const { typing } = this.state;
    if (!typing) {
      this.setState({ typing: true });
    }
  }

  typingFlagOff() {
    const { typing } = this.state;
    if (typing) {
      this.setState({ typing: false });
    }
  }
  

  render() {
    const {
      onUpdateTime,
      onAddExercise,
    } = this.props;
    const {
      exercises,
      restTime,
      workTime,
      rounds,
      saving,
    } = this.state;
    
    return (
      <div>
        <form>
          <h2 style={{ marginTop: '0' }}>Settings</h2>
          <p>Time should be in seconds, ex: 1 min = 60s.</p>
          <div className="form-inputs">
            <label htmlFor="workoutTime">Workout Time:</label>
            <input type="text" className="shorter" name="workTime" id="workoutTime" value={workTime} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="rest">Rest Time:</label>
            <input type="text" className="shorter" name="restTime" id="rest" value={restTime} onChange={this.handleInput} />
          </div>
          <div className="form-inputs">
            <label htmlFor="rounds">Rounds:</label>
            <input type="text" className="shorter" name="rounds" id="rounds" value={rounds} onChange={this.handleInput} />
          </div>
          <button type="button" className="btn" onClick={() => onUpdateTime(workTime, restTime, rounds)}>Update Timer</button>
          <div className="exercises">
            <h3>Exercises:</h3>
            <div className="form-inputs">
              {exercises && exercises.map((exercise, index) => ( 
                <div key={exercise + index} style={{ margin: '10px 0' }}>
                  <label htmlFor="exercises" style={{ marginBottom: '6px' }}>Exercise {index + 1}:</label>
                  <div className="combinedBtnInput">
                    <input type="text" name={exercise.name} placeholder={`Exercise ${index + 1}`} value={exercises[index].name} data-index={index} onChange={this.handleListedInput} onFocus={this.typingFlagOn} onBlur={this.typingFlagOff} />
                  </div>
                </div>
              ))}
              <p>{saving ? 'Saving...' : '\u00A0'}</p>
              <button className="btn" onClick={() => onAddExercise()} type="button">Add Exercise</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  workTime: PropTypes.number.isRequired,
  restTime: PropTypes.number.isRequired,
  rounds: PropTypes.number.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  onAddExercise: PropTypes.func.isRequired,
  exercises: PropTypes.array,
};

Settings.defaultProp = {
  exercises: [],
};

const mapStateToProps = state => {
  return {
    workTime: state.time.workTime,
    restTime: state.time.restTime,
    rounds: state.time.rounds,
    exercises: state.exe.exercises,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchSession: () => dispatch({ type: actionTypes.FETCH_SESSION }),
    onUpdateTime: (work, rest, rounds) => dispatch({ type: actionTypes.UPDATE_TIMER, workTime: work, restTime: rest, rounds: rounds }),
    onAddExercise: (index) => dispatch({ type: actionTypes.ADD_EXERCISE, index: index }),
    onUpdateExercise: (name) => dispatch({ type: actionTypes.UPDATE_EXERCISE, id: name, name: name })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);