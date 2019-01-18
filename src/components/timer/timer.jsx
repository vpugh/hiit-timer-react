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

  createWorkoutTotal() {
    const { totalWorkoutTime } = this.state;
    const sec = totalWorkoutTime >= 10 ? totalWorkoutTime : '0' + totalWorkoutTime;
    return ":" + sec;
  }

  generateTotalRounds() {
    const { numberOfExercise, rounds } = this.state;
    const combinedStage = numberOfExercise * 2;
    return combinedStage * rounds - 1;
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

  updateTotalWork() {
    const { workoutTime } = this.state;
    this.setState({
      totalWorkoutTime: workoutTime,
    });
  }

  updateTotalRest() {
    const { restTime } = this.state;
    this.setState({
      totalRestTime: restTime,
    });
  }

  isEven(num) {
    return num % 2 === 0
  }

  timerPlay() {
    console.log('Play');
    this.setState({ 
      isTimerRunning: true,
      timerPaused: false,
      interval: setInterval(this.countdownTimer(), 1000),
    });
  }

  timerPause() {
    const { interval } = this.state;
    console.log('Paused');
    this.setState({
      isTimerRunning: false,
      timerPaused: true,
    });
    clearInterval(interval);
  }

  timerReset() {
    const { interval, workoutTime } = this.state;
    console.log('Reset');
    this.setState({
      isTimerRunning: false,
      timerPaused: false,
      totalWorkoutTime: workoutTime,
      round: 0,
    });
    clearInterval(interval);
  }

  countdownTimer() {
    const { totalWorkoutTime, interval, round } = this.state;
    if (totalWorkoutTime === 0 && this.generateTotalRounds() === round) {
      this.setState({
        isTimerRunning: false,
        timerPaused: false,
      }, clearInterval(interval));
      this.roundStep();
    } else if (totalWorkoutTime === 0 && this.generateTotalRounds() !== round) {
      clearInterval(interval);
      this.setState({
        interval: setInterval(this.countdownTimer(), 1000),
      }, this.roundStep());
    } else if (totalWorkoutTime <= 6 && totalWorkoutTime !== 0) {
      clearInterval(interval);
      this.setState({
        interval: setInterval(this.countdownTimer(), 1000),
      }, totalWorkoutTime--);
    } else {
      totalWorkoutTime--;
    }
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
      <>
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
        <div className="timer">{this.createWorkoutTotal()}</div>
        <div className="buttons">
          {!isTimerRunning && <button onClick={this.timerPlay}>Start <span className="fa fa-play"></span></button>}
          {isTimerRunning && <button onClick={this.timerPause}>Pause <span className="fa fa-pause"></span></button>}
          <button onClick={this.timerReset}>Restart <span className="fa fa-redo"></span></button>
        </div>
      </>
    )
  }
}

export default Timer;