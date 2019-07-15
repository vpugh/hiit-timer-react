import React, { useContext, useState, useEffect } from 'react';
import './timer.scss';
import TimerState from './timer-state';
import { Store } from '../../redux/Store';
import NewBeep from '../../assets/sounds/beep-v2.mp3';
import NewAirhorn from '../../assets/sounds/airhorn.mp3';
import NewDing from '../../assets/sounds/ding.mp3';
import { ThemeContext } from '../../contexts/ThemeContext';

const loopThroughUseState = (object: any, setState: any) => {
  for (let i:number = 0; i < object; i += 1) {
    setState(prev => ([...prev, i]));
  }
}
 
export default function Timer():JSX.Element {
  const {state} = useContext(Store);
  const theme:{ chosenTheme: string, options: string[], green: any, orange: any, purple: any, updateTheme: any} = useContext(ThemeContext);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(state.timer[0].workTime);
  const [totalRestTime] = useState<number>(state.timer[0].restTime);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [totalStages, setTotalStages] = useState<number[]>([]);
  const [totalExercises, setTotalExercises] = useState<any[]>([]);
  const [exerciseNames, setExerciseNames] = useState<any[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const themeColor = theme.chosenTheme;
  const accentColor = theme[themeColor].accent;
  const btnText = theme[themeColor].bgLink;

  useEffect(() => {
    createExerciseNames();
    createStages();
    createExercise();
  }, []);

  useEffect(() => {
    let interval:number = 0;
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        countdown();
      }, 1000);
    } else if (!isTimerRunning && totalWorkoutTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, totalWorkoutTime, totalRestTime]);

  const createStages = () => loopThroughUseState(state.timer[0].rounds, setTotalStages);

  const createExercise = () => loopThroughUseState(Object.keys(state.exercises).length * 2, setTotalExercises);

  const createExerciseNames = () => {
    for (let i:number = 0; i < Object.keys(state.exercises).length; i += 1) {
      setExerciseNames(prevExerciseNames => ([...prevExerciseNames, state.exercises[i].name, 'rest']));
    }
  }

  const roundTotal = () => {
    return (Object.keys(state.exercises).length * 2) * state.timer[0].rounds - 1;
  }

  const exerciseRoundTime = () => {
    if (totalWorkoutTime >= 10) {
      return `${totalWorkoutTime}s`;
    }
    return `0${totalWorkoutTime}s`;
  }

  const isEven = (num: number) => num % 2 === 0

  // Timer Controls
  const timerPlay = () => {
    setIsTimerRunning(true);
  }

  const timerPaused = () => {
    setIsTimerRunning(false);
  }
  
  const timerReset = () => {
    setIsTimerRunning(false);
    setTotalWorkoutTime(state.timer[0].workTime);
    setCurrentRound(0);
  }

  const countdown = () => {
    const correctCurrentRound = currentRound + 1;
    if (totalWorkoutTime === 0 && roundTotal() === correctCurrentRound) {
      {playAudio(NewAirhorn)}
      timerReset();
    } else if (totalWorkoutTime === 0 && roundTotal() !== correctCurrentRound) {
      {playAudio(NewDing)}
      nextRound();
    } else if ( totalWorkoutTime <= 7 && totalWorkoutTime !== 0) {
      {playAudio(NewBeep)}
      setTotalWorkoutTime(totalWorkoutTime - 1);
    } else {
      setTotalWorkoutTime(totalWorkoutTime - 1);
    }
  }

  const nextRound = () => {
    setCurrentRound(currentRound + 1);

    if (!isEven(currentRound)) {
      setTotalWorkoutTime(state.timer[0].workTime);
    }

    if (isEven(currentRound)) {
      setTotalWorkoutTime(state.timer[0].restTime);
    }
  }

  const playAudio = src => {
    new Audio(src).play();
  }

  return (
    <div className="timer-body">
      <div className="timer">{exerciseRoundTime()}</div>
      <div className="buttons">
        {!isTimerRunning && <button style={{ background: accentColor, color: btnText }} onClick={timerPlay}>Start <span className="fa fa-play"></span></button>}
        {isTimerRunning && <button style={{ background: accentColor, color: btnText }} onClick={timerPaused}>Pause <span className="fa fa-pause"></span></button>}
      </div>
      <TimerState
        currentRound={currentRound}
        totalExercises={totalExercises}
        exerciseNames={exerciseNames}
        namedExercise={state.exercises}
        totalRounds={state.timer[0].rounds}
      />
    </div>
  );
}