import React from 'react';
import './timer.scss';
import TimerState from './timer-state';
import { IExercise } from '../../interfaces';
import NewBeep from '../../assets/sounds/beep-v2.mp3';
import NewAirhorn from '../../assets/sounds/airhorn.mp3';
import NewDing from '../../assets/sounds/ding.mp3';

interface ITimerProps {
  exercises: IExercise[],
  timer: {
    restTime: number,
    workTime: number,
    rounds: number,
  }
}

interface ITimerState {
  totalWorkoutTime: number,
  totalRestTime: number, 
  currentRound: number,
  totalStages: number[],
  totalExercises: number[],
  nameTestArray: number[],
  isTimerRunning: boolean,
  isTimerPaused: boolean,
}


class Timer extends React.Component<ITimerProps, ITimerState> {
  interval:any;
  timerID:number;
  beep: string;
  ding: string;
  airhorn: string;
  constructor(props) {
    super(props);
    this.state = {
      totalWorkoutTime: this.props.timer[0].workTime,
      totalRestTime: this.props.timer[0].restTime,
      currentRound: this.props.timer[0].rounds,
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
    console.log('Test', this.props.timer[0]);
    this.createExerciseNames();
    this.createStages();
    this.createExercise();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  // Generate rounds and Exercise Arrays
  createStages = () => {
    const { totalStages } = this.state;
    for (let i:number = 0; i < this.props.timer[0].rounds; i += 1) {
      if (i) { totalStages.push(i) }
    }
  }

  createExercise = () => {
    const { totalExercises } = this.state;
    for (let i:number = 0; i < Object.keys(this.props.exercises).length * 2; i += 1) {
      if (i) { totalExercises.push(i) }
    }
  }

  createExerciseNames = () => {
    const nameTest:any[] = [];
    for (let i = 0; i < Object.keys(this.props.exercises).length; i += 1) {
      if (i === Object.keys(this.props.exercises).length) {
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
    return (Object.keys(this.props.exercises).length * 2) * this.props.timer[0].rounds - 1;
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

  isEven = (num) => num % 2 === 0

  // Timer Controls

  timerPlay = () => {
    this.setState({
      isTimerRunning: true,
      isTimerPaused: false,
    });
    // @ts-ignore
    this.interval = setInterval(() => this.countdown(),1000);
  }

  timerPause = () => {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: true,
      // @ts-ignore
    },clearInterval(this.interval));
  }
  
  timerReset = () => {
    this.setState({
      isTimerRunning: false,
      isTimerPaused: false,
      totalWorkoutTime: this.props.timer[0].workTime,
      currentRound: 0,
      // @ts-ignore
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
      this.setState({ totalWorkoutTime: this.props.timer[0].workTime });
    }
    if (this.isEven(currentRound)) {
      // 2,4,6,8,etc (EVEN) are rest
      this.setState({ totalWorkoutTime: this.props.timer[0].restTime });
    }
  }


  beepSound = () => {
    if (this.state.isTimerRunning) {
      // @ts-ignore
      this.refs.audio.play();
    } else {
      // @ts-ignore
      this.refs.audio.pause();
    }
  }

  dingSound = () => {
    if (this.state.isTimerRunning) {
      // @ts-ignore
      this.refs.audioDing.play();
    } else {
      // @ts-ignore
      this.refs.audioDing.pause();
    }
  }

  hornSound = () => {
    if (this.state.isTimerRunning) {
      // @ts-ignore
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
          totalRounds={this.props.timer[0].rounds}
        />
      </div>
    )
  }
}

export default Timer;