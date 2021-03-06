import React from 'react';
import PropTypes from 'prop-types';
import './timer.scss';
import TimerState from './timer-state';
import NewBeep from '../../assets/sounds/beep-v2.mp3';
import NewAirhorn from '../../assets/sounds/airhorn.mp3';
import NewDing from '../../assets/sounds/ding.mp3';
import { connect } from 'react-redux';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalWorkoutTime: '', // total amount of workout - # exercies x amt of rounds
      totalRestTime: '', // total rest in workout - time of rest x (amt of rounds - 1)
      currentRound: 0, // current exercise round
      totalStages: [],
      totalExercises: [],
      nameTestArray: [],
      isTimerRunning: false,
      isTimerPaused: true,
    };
    this.beep = NewBeep;
    this.ding = NewDing;
    this.airhorn = NewAirhorn;
  }

  componentDidMount() {
    this.setState({ totalWorkoutTime: this.props.workTime }, () => {
      this.createExerciseNames();
      this.createStages();
      this.createExercise();
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  // Generate rounds and Exercise Arrays
  createStages = () => {
    const { totalStages } = this.state;
    for (let i = 0; i < this.props.rounds; i += 1) {
      if (i) { totalStages.push(i) }
    }
  }

  createExercise = () => {
    const { totalExercises } = this.state;
    for (let i = 0; i < this.props.exercises.length * 2; i += 1) {
      if (i) { totalExercises.push(i) }
    }
  }

  createExerciseNames = () => {
    const nameTest = [];
    for (let i = 0; i < this.props.exercises.length; i += 1) {
      if (i === this.props.exercises.length) {
        nameTest.push(this.props.exercises[i].name);
      } else {
        nameTest.push(this.props.exercises[i].name, 'rest');
      }
    }
    this.setState({
      nameTestArray: nameTest,
    });
  }
  
  // generate total # rounds
  roundTotal() {
    return (this.props.exercises.length * 2) * this.props.rounds - 1;
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

  isEven = (num) => {
    return num % 2 === 0;
  }

  // Timer Controls

  timerPlay = () => {
    this.setState({
      isTimerRunning: true,
      isTimerPaused: false,
    });
    this.interval = setInterval(() => this.countdown(),1000);
  }

  timerPause = () => {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: true,
    }, clearInterval(this.interval));
  }
  
  timerReset = () => {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: false,
      totalWorkoutTime: this.props.workTime,
      currentRound: 0,
    }, clearInterval(this.interval));
  }

  countdown = () => {
    const { totalWorkoutTime, currentRound } = this.state;
    const correctCurrentRound = currentRound + 1;
    if (totalWorkoutTime === 0 && this.roundTotal() === correctCurrentRound) {
      // Timer is done. TotalTime is 0, totalRounds equals the currentNumber
      this.hornSound();
      this.timerReset();
    } else if (totalWorkoutTime === 0 && this.roundTotal() !== correctCurrentRound) {
      // End of current round, onto next round. Clear ticking (interval), set next round, turn ticking back on.
      this.dingSound();
      clearInterval(this.interval);
      this.nextRound();
      this.interval = setInterval(() => this.countdown(),1000);
    } else if ( totalWorkoutTime <= 7 && totalWorkoutTime !== 0) {
      this.beepSound();
      this.setState({ totalWorkoutTime: totalWorkoutTime - 1 });
    } else {
      this.setState({ totalWorkoutTime: totalWorkoutTime - 1 });
    }
  }

  nextRound = () => {
    const { currentRound } = this.state;
    // Round always goes up
    this.setState({ currentRound: currentRound + 1 });

    // Checks which to display, exercise or rest
    if (!this.isEven(currentRound)) {
      // 1,3,5,7,etc (ODD) are exercise
      this.setState({ totalWorkoutTime: this.props.workTime });
    }
    if (this.isEven(currentRound)) {
      // 2,4,6,8,etc (EVEN) are rest
      this.setState({ totalWorkoutTime: this.props.restTime });
    }
  }

  beepSound = () => {
    if (this.state.isTimerRunning) {
      this.refs.audio.play();
    } else {
      this.refs.audio.pause();
    }
  }

  dingSound = () => {
    if (this.state.isTimerRunning) {
      this.refs.audioDing.play();
    } else {
      this.refs.audioDing.pause();
    }
  }

  hornSound = () => {
    if (this.state.isTimerRunning) {
      this.refs.audioHorn.play();
    }
  }

  sound = (mp3) => {
    const audio_tag = React.createRef;
    return (
      <audio ref={audio_tag} src={mp3} controls autoPlay />
    );
  }

  render() {
    const {
      currentRound,
      totalExercises,
      isTimerRunning,
      nameTestArray,
    } = this.state;

    return (
      <div className="timer-body">
        <div className="timer">{this.exerciseRoundTime()}</div>
        <audio ref="audio" src={NewBeep} preload="auto" />
        <audio ref="audioDing" src={NewDing} preload="auto" />
        <audio ref="audioHorn" src={NewAirhorn} preload="auto" />
        <div className="buttons">
          {!isTimerRunning && <button onClick={this.timerPlay}>Start <span className="fa fa-play"></span></button>}
          {isTimerRunning && <button onClick={this.timerPause}>Pause <span className="fa fa-pause"></span></button>}
        </div>
        <TimerState
          currentRound={currentRound}
          totalExercises={totalExercises}
          nameTestArray={nameTestArray}
          namedExercise={this.props.exercises}
          totalRounds={this.props.rounds}
        />
      </div>
    )
  }
}

Timer.propTypes = {
  workTime: PropTypes.number.isRequired,
  restTime: PropTypes.number.isRequired,
  rounds: PropTypes.number.isRequired,
}

const mapStateToProps = state => {
  return {
    workTime: state.time.workTime,
    restTime: state.time.restTime,
    rounds: state.time.rounds,
    exercises: state.exe.exercises,
  };
}

export default connect(mapStateToProps)(Timer);