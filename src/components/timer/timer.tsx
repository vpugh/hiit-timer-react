import React, { useState, useEffect } from 'react';
import './timer.scss';
import TimerState from './timer-state';
import { ITimerProps } from '../../interfaces';
import NewBeep from '../../assets/sounds/beep-v2.mp3';
import NewAirhorn from '../../assets/sounds/airhorn.mp3';
import NewDing from '../../assets/sounds/ding.mp3';

const loopThroughUseState = (object: any, setState: any) => {
  for (let i:number = 0; i < object; i += 1) {
    setState(prev => ([...prev, i]));
  }
}
 
const Timer: React.FC<ITimerProps> = (props) => {
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(props.timer[0].workTime);
  const [totalRestTime, setTotalRestTime] = useState<number>(props.timer[0].restTime);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [totalStages, setTotalStages] = useState<number[]>([]);
  const [totalExercises, setTotalExercises] = useState<any[]>([]);
  const [exerciseNames, setExerciseNames] = useState<any[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  useEffect(() => {
    createExerciseNames();
    createStages();
    createExercise();
  }, []);

    const createStages = () => {
      loopThroughUseState(props.timer[0].rounds, setTotalStages);
      // for (let i:number = 0; i < props.timer[0].rounds; i += 1) {
      //   setTotalStages(prevTotalStages => ([...prevTotalStages, i]));
      // }
    }

    const createExercise = () => {
      loopThroughUseState(Object.keys(props.exercises).length * 2, setTotalExercises)
      // for (let i:number = 0; i < Object.keys(props.exercises).length * 2; i += 1) {
      //   setTotalExercises(prevTotalExercises => ([...prevTotalExercises, i]));
      // }
    }

    const createExerciseNames = () => {
      for (let i:number = 0; i < Object.keys(props.exercises).length; i += 1) {
        const exerciseLength:number = Object.keys(props.exercises).length - 1;
        if (i === exerciseLength) {
          setExerciseNames(prevExerciseNames => ([...prevExerciseNames, props.exercises[i].name]));
        }
        if (i !== exerciseLength) {
          setExerciseNames(prevExerciseNames => ([...prevExerciseNames, props.exercises[i].name, 'rest']));
        }
      }
    }

    const roundTotal = () => {
      return (Object.keys(props.exercises).length * 2) * props.timer[0].rounds - 1;
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
      setIsTimerPaused(false);
      // @ts-ignore
      this.interval = setInterval(() => countdown(),1000);
    }

    const timerPaused = () => {
      setIsTimerRunning(false);
      setIsTimerPaused(true);
      // @ts-ignore
      clearInterval(this.interval);
    }
    
    const timerReset = () => {
      setIsTimerRunning(false);
      setIsTimerPaused(false);
      setTotalWorkoutTime(props.timer[0].workTime);
      setCurrentRound(0);
      // @ts-ignore
      clearInterval(this.interval);
    }

    const countdown = () => {
      const correctCurrentRound = currentRound + 1;
      if (totalWorkoutTime === 0 && roundTotal() === correctCurrentRound) {
        // this.hornSound();
        timerReset();
      } else if (totalWorkoutTime === 0 && roundTotal() !== correctCurrentRound) {
        // this.dingSound();
        clearInterval(this.interval);
        nextRound();
        this.interval = setInterval(() => countdown(),1000);
      } else if ( totalWorkoutTime <= 7 && totalWorkoutTime !== 0) {
        // this.beepSound();
        setTotalWorkoutTime(totalWorkoutTime - 1);
      } else {
        setTotalWorkoutTime(totalWorkoutTime - 1);
      }
    }

    const nextRound = () => {
      setCurrentRound(currentRound + 1);

      if (!isEven(currentRound)) {
        setTotalWorkoutTime(props.timer[0].workTime);
      }

      if (isEven(currentRound)) {
        setTotalWorkoutTime(props.timer[0].restTime);
      }
    }

    return (
      <div className="timer-body">
        <div className="timer">{exerciseRoundTime()}</div>
        {/* <audio ref="audio" src={NewBeep} preload="auto" />
        <audio ref="audioDing" src={NewDing} preload="auto" />
        <audio ref="audioHorn" src={NewAirhorn} preload="auto" /> */}
        <div className="buttons">
          {!isTimerRunning && <button onClick={timerPlay}>Start <span className="fa fa-play"></span></button>}
          {isTimerRunning && <button onClick={timerPaused}>Pause <span className="fa fa-pause"></span></button>}
        </div>
        <TimerState
          currentRound={currentRound}
          totalExercises={totalExercises}
          exerciseNames={exerciseNames}
          namedExercise={props.exercises}
          totalRounds={props.timer[0].rounds}
        />
      </div>
    );
}
 
export default Timer;