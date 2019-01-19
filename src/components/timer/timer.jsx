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
      exercises: 3, // Number of different exercises
      namedExercise: ['squats', 'push-ups', 'burpees', 'pull-ups'],
      exerciseTime: 4, // Duration of each exercise
      restTime: 2, // rest between each exercise
      totalWorkoutTime: '', // total amount of workout - # exercies x amt of rounds
      totalRestTime: '', // total rest in workout - time of rest x (amt of rounds - 1)
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
    this.isEven = this.isEven.bind(this);
    this.createExercise = this.createExercise.bind(this);
  }

  /// test exercise object
  // {
  //   "name": "squat",
  //   "exerciseTime": "20",
  //   "restTime": "10",
  // },
  // {
  //   "name": "burpees",
  //   "exerciseTime": "60",
  //   "restTime": "15",
  // },

  componentDidMount() {
    const { exerciseTime } = this.state;
    this.setState({ totalWorkoutTime: exerciseTime });
    this.createStages();
    this.createExercise();
    this.createExerciseNames();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  // Generate rounds and Exercise Arrays
  createStages() {
    const { totalRounds, totalStages } = this.state;
    for (let i = 0; i < totalRounds; i += 1) {
      if (i) { totalStages.push(i) }
    }
  }

  createExercise() {
    const { exercises, totalExercises, namedExercise } = this.state;
    for (let i = 0; i < namedExercise.length * 2; i += 1) {
      if (i) { totalExercises.push(i) }
    }
  }

  createExerciseNames() {
    const { namedExercise } = this.state;
    const nameTest = [];
    for (let i = 0; i < namedExercise.length; i += 1) {
      if (i === namedExercise.length - 1) {
        nameTest.push(namedExercise[i]);
      } else {
        nameTest.push(namedExercise[i], 'rest');
      }
    }
    this.setState({
      nameTestArray: nameTest,
    });
  }
  
  // generate total # rounds
  roundTotal() {
    const { exercises, totalRounds } = this.state;
    return (exercises * 2) * totalRounds - 1;
  }
  
  // Control exercise time display
  exerciseRoundTime() {
    const { totalWorkoutTime } = this.state;
    if (totalWorkoutTime >= 10) {
      return `${totalWorkoutTime}s`;
    } else {
      return `0${totalWorkoutTime}s`;
    }
  }

  isEven(num) {
    return num % 2 === 0;
  }

  // Timer Controls

  timerPlay() {
    this.setState({
      isTimerRunning: true,
      isTimerPaused: false,
    });
    this.interval = setInterval(() => this.countdown(),1000);
  }

  timerPause() {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: true,
    }, clearInterval(this.interval));
  }
  
  timerReset() {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: false,
      totalWorkoutTime: this.state.exerciseTime,
      currentRound: 0,
    }, clearInterval(this.interval));
  }

  countdown() {
    const { totalWorkoutTime, currentRound } = this.state;
    const correctCurrentRound = +currentRound + 1;
    if (totalWorkoutTime === 0 && this.roundTotal() === correctCurrentRound) {
      // Timer is done. TotalTime is 0, totalRounds equals the currentNumber
      this.timerReset();
    } else if (totalWorkoutTime === 0 && this.roundTotal() !== correctCurrentRound) {
      // End of current round, onto next round. Clear ticking (interval), set next round, turn ticking back on.
      clearInterval(this.interval);
      this.nextRound();
      this.interval = setInterval(() => this.countdown(),1000);
    } else if ( totalWorkoutTime <= 6 && totalWorkoutTime !== 0) {
      // Time low warning, triggers extra behaviour (sounds)
      // ADD SOUNDS *Some kind of alarm bell ringing*
      this.setState({ totalWorkoutTime: +totalWorkoutTime - 1 });
    } else {
      this.setState({ totalWorkoutTime: +totalWorkoutTime - 1 });
    }
  }

  nextRound() {
    const { currentRound, restTime, exerciseTime } = this.state;
    // Round always goes up
    this.setState({ currentRound: +currentRound + 1 });

    // Checks which to display, exercise or rest
    if (!this.isEven(currentRound)) {
      // 1,3,5,7,etc (ODD) are exercise
      this.setState({ totalWorkoutTime: exerciseTime });
    }
    if (this.isEven(currentRound)) {
      // 2,4,6,8,etc (EVEN) are rest
      this.setState({ totalWorkoutTime: restTime });
    }
  }
  

  render() {
    const {
      currentRound,
      exercises,
      totalRounds,
      totalExercises,
      isTimerRunning,
      nameTestArray,
      namedExercise,
    } = this.state;

    return (
      <div style={{ width: '70%', textAlign: "left", margin: '0 auto' }}>
        <div className="timer">{this.exerciseRoundTime()}</div>
        <div className="buttons">
          {!isTimerRunning && <button onClick={this.timerPlay}>Start <span className="fa fa-play"></span></button>}
          {isTimerRunning && <button onClick={this.timerPause}>Pause <span className="fa fa-pause"></span></button>}
        </div>
        {this.state.totalWorkoutTime}
        {this.state.totalRounds}
        {this.state.currentRound}
        <TimerState
          currentRound={currentRound}
          exercises={exercises}
          totalExercises={totalExercises}
          nameTestArray={nameTestArray}
          createExerciseNames={this.createExerciseNames}
          namedExercise={namedExercise}
          totalRounds={totalRounds}
        />
        <Stage
          currentRound={currentRound}
          exercises={exercises}
          totalRounds={totalRounds}
        />
      </div>
    )
  }
}

export default Timer;