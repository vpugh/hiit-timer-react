export interface IExercise {
  index: number,
  name: string,
}

export interface ITimer {
  restTime: number,
  workTimer: number,
  rounds: number,
}

export interface IState {
  exercises: IExercise[],
  timer: ITimer[],
}

// Timer Page Interfaces

export interface ITimerProps {
  exercises: IExercise[],
  timer: {
    restTime: number,
    workTime: number,
    rounds: number,
  }
}

export interface ITimerState {
  totalWorkoutTime: number,
  totalRestTime: number, 
  currentRound: number,
  totalStages: number[],
  totalExercises: number[],
  nameTestArray: number[],
  isTimerRunning: boolean,
  isTimerPaused: boolean,
}

export interface ITimerStateProps {
  currentRound: number,
  nameTestArray: number[],
  namedExercise: IExercise[],
  totalRounds: number,
  totalExercises: number[],
}

// Settings Page Interfaces

export interface ISettingsProps {
  exercises: IExercise[],
  timer: {
    restTime: number,
    workTime: number,
    rounds: number,
  }
}

export interface ISettingsState {
  exerciseNumber: number,
  restTime: number,
  workTime: number,
  rounds: number,
  exercises: IExercise[],
  saving: boolean,
}

export interface IFormInputsProps {
  title: string,
  name: string,
  id: string,
  value: string,
  onChange: any,
}