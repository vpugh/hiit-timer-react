import React from 'react';
import PropTypes from 'prop-types';
import './timer.scss';
import Stage from './stage';
import TimerState from './timer-state';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: 3,
      numberOfExercise: 4,
      workoutTime: 20,
      restTime: 10,
      totalWorkoutTime: '',
      totalRestTime: '',
      isTimerRunning: false,
      interval: null,
      isModalOpen: false,
      round: 0,
      stages: [],
      exercise: [],
    };
    this.timerPlay = this.timerPlay.bind(this);
    this.timerPause = this.timerPause.bind(this);
    this.timerReset = this.timerReset.bind(this);
  }

  componentDidMount() {
    const { workoutTime } = this.state;
    this.setState({
      totalWorkoutTime: workoutTime,
    })
    this.createStages();
    this.createExercise();
  }

  generateWorkoutTotal() {
    const { totalWorkoutTime } = this.state;
    const sec = totalWorkoutTime >= 10 ? totalWorkoutTime : '0' + totalWorkoutTime;
    return ":" + sec;
  }

  generateTotalRounds() {
    const { numberOfExercise, rounds } = this.state;
    const combinedStage = numberOfExercise * 2;
    return combinedStage * rounds - 1;
  }

  // Methods

  openModal() {
    this.setState({
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  handleInputChange(value, name) {
    if (name === 'workTime') {
      this.setState({
        workoutTime: value,
      }, this.updateTotalWork());
    }
    if (name === 'restTime') {
      this.setState({
        restTime: value,
      }, this.updateTotalRest());
    }
    if (name === 'amtExercise') {
      this.setState({
        numberOfExercise: value,
      }, this.createExercise());
    }
    this.setState({
      rounds: value,
    }, this.createStages());
  }

  createStages() {
    const { rounds, stages } = this.state;
    for (let i = 0; i < rounds; i += 1) {
      stages.push(i);
    }
  }

  createExercise() {
    const { numberOfExercise, exercise } = this.state;
    for (let i = 0; i < numberOfExercise * 2; i += 1) {
      exercise.push(i);
    }
  }

  updateTotalWork() {
    const { totalWorkoutTime, workoutTime } = this.state;
    return totalWorkoutTime = workoutTime;
  }

  updateTotalRest() {
    const { totalRestTime, restTime } = this.state;
    return totalRestTime = restTime;
  }

  isEven(num) {
    return num % 2 === 0
  }

  timerPlay() {
    console.log('Play');
    this.setState({ 
      isTimerRunning: true,
      timerPaused: false,
      interval: setInterval(this.coundtownTimer(), 1000),
    });
  }

  timerPause() {
    console.log('Paused');
    this.setState({
      isTimerRunning: false,
      timerPaused: true,
    });
    clearInterval(this.state.interval);
  }

  timerReset() {
    console.log('Reset');
    this.setState({
      isTimerRunning: false,
      timerPaused: false,
      totalWorkoutTime: this.state.workoutTime,
      round: 0,
    });
    clearInterval(this.state.interval);
  }

  coundtownTimer() {
    const { totalWorkoutTime, interval, round } = this.state;
    if (totalWorkoutTime === 0 && this.generateTotalRounds() == round) {
      this.setState({
        isTimerRunning: false,
        timerPaused: false,
      })
      clearInterval(interval);
      this.roundStep();
    }
    if (totalWorkoutTime === 0 && this.generateTotalRounds() !== round) {
      this.setState({
        interval: setInterval(this.coundtownTimer(), 1000),
      }, this.roundStep());
      clearInterval(interval);
    }
    if (totalWorkoutTime <= 6 && totalWorkoutTime !== 0) {
      this.setState({
        interval: setInterval(this.coundtownTimer(), 1000),
      }, totalWorkoutTime--);
      clearInterval(interval);
    }
    totalWorkoutTime--;
  }

  roundStep() {
    const { round, totalWorkoutTime, restTime, totalRounds, workoutTime } = this.state;
    round++;
    if (round == totalRounds) {
      this.timerReset();
    }
    if (this.isEven(round) == true) {
      totalWorkoutTime === workoutTime;
    }
    if (this.isEven(round) == false) {
      totalWorkoutTime === restTime;
    }
  }

  render() {
    const {
      round,
      numberOfExercise,
      rounds,
      exercise,
      isTimerRunning,
    } = this.state;

    return (
      <div className="main">
        <Stage
          round={round}
          numberOfExercise={numberOfExercise}
          rounds={rounds}
        />
        <TimerState
          round={round}
          numberOfExercise={numberOfExercise}
          exercise={exercise}
        />
        <div className="timer">{this.generateWorkoutTotal()}</div>
        <div className="buttons">
          {!isTimerRunning && <button onClick={this.timerPlay}>Start <span className="fa fa-play"></span></button>}
          {isTimerRunning && <button onClick={this.timerPause}>Pause <span className="fa fa-pause"></span></button>}
          <button onClick={this.timerReset}>Restart <span className="fa fa-redo"></span></button>
        </div>
      </div>
    )
  }
}

export default Timer;