import React from 'react';
import PropTypes from 'prop-types';
import './timer.scss';
import Stage from './stage';
import TimerState from './timer-state';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalRounds: 3, // Amt of exercise rounds
      exercises: 4, // Number of different exercises
      exerciseTime: 20, // Duration of each exercise
      restTime: 10, // rest between each exercise
      totalWorkoutTime: '', // total amount of workout - # exercies x amt of rounds
      totalRestTime: '', // total rest in workout - time of rest x (amt of rounds - 1)
      interval: null, // 
      currentRound: 0, // current exercise round
      totalStages: [],
      totalExercises: [],
      isTimerRunning: false,
      isTimerPaused: true,
    };
    this.timerPlay = this.timerPlay.bind(this);
    this.timerPause = this.timerPause.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  componentDidMount() {
    const { exerciseTime } = this.state;
    this.setState({ totalWorkoutTime: exerciseTime });
    this.createStages();
    this.createExercise();
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.exerciseTime !== this.state.exerciseTime) {
  //     this.setState({ totalWorkoutTime: this.state.exerciseTime })
  //   }
  // }
  
  // Generate rounds and Exercise Arrays
  createStages() {
    const { totalRounds, totalStages } = this.state;
    for (let i = 0; i < totalRounds; i += 1) {
      if (i) { totalStages.push(i) }
    }
  }

  createExercise() {
    const { exercises, totalExercises } = this.state;
    for (let i = 0; i < exercises * 2; i += 1) {
      if (i) { totalExercises.push(i) }
    }
  }
  
  // generate total # rounds
  roundTotal() {
    const { exercises, totalRounds } = this.state;
    return (exercises * 2) * totalRounds - 1;
  }
  
  // Control exercise time
  exerciseRoundTime() {
    const { totalWorkoutTime } = this.state;
    if (totalWorkoutTime >= 10) {
      return `:${totalWorkoutTime}`;
    } else {
      return `:0${totalWorkoutTime}`;
    }
  }

  // Timer Controls

  timerPlay() {
    this.setState({
      isTimerRunning: true,
      isTimerPaused: false,
      interval: setInterval(this.countdown(), 1000),
    });
  }

  timerPause() {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: true,
      interval: null,
    }, clearInterval(this.state.interval));
  }
  
  timerReset() {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: false,
      totalWorkoutTime: this.state.exerciseTime,
      round: 0,
      interval: null,
    }, clearInterval(this.state.interval));
  }

  countdown() {
    const { totalWorkoutTime, interval, currentRound } = this.state;
    if (totalWorkoutTime === 0 && this.roundTotal === currentRound) {
      console.log('Next Round');
      this.setState({
        isTimerRunning: false,
        isTimerPaused: false,
        interval: null,
      }, clearInterval(interval));
      this.nextRound();
    } else if (totalWorkoutTime === 0 && this.roundTotal !== currentRound) {
      console.log('Next Round 2');
      clearInterval(interval);
      this.setState({
        interval: setInterval(this.countdownTimer(), 1000),
      }, this.nextRound());
      setInterval(this.countdown(), 1000);
    } else if ( totalWorkoutTime <= 6 && totalWorkoutTime !== 0) {
      console.log('Countdown---')
      clearInterval(interval);
      this.setState({
        interval: setInterval(this.countdownTimer(), 1000),
        totalWorkoutTime: +totalWorkoutTime - 1,
      }, setInterval(this.countdown(), 1000));
    } else {
      this.setState({
        totalWorkoutTime: +totalWorkoutTime - 1,
      });
    }
  }
  

  render() {
    const {
      currentRound,
      exercises,
      totalRounds,
      totalExercises,
      isTimerRunning,
    } = this.state;

    return (
      <>
        <Stage
          currentRound={currentRound}
          exercises={exercises}
          totalRounds={totalRounds}
        />
        <TimerState
          currentRound={currentRound}
          exercises={exercises}
          totalExercises={totalExercises}
        />
        {this.state.interval}
        <div className="timer">{this.exerciseRoundTime()}</div>
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