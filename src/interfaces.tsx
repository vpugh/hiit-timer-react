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
