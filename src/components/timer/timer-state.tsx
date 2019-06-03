import React from 'react';
import { IExercise } from '../../interfaces';
import { isEmptyObject } from '../../shared/isEmpty';

interface ITimerStateProps {
  currentRound: number,
  nameTestArray: number[],
  namedExercise: IExercise[],
  totalRounds: number,
  totalExercises: number[],
}

class TimerState extends React.Component<ITimerStateProps, {}> {

  namedState() {
    const { currentRound, nameTestArray, namedExercise } = this.props;
    const circuit = Math.ceil((currentRound + 1) / (Object.keys(namedExercise).length * 2));
    if (nameTestArray[currentRound + 1] <= Object.keys(namedExercise).length * 2) {
      return nameTestArray[currentRound];
    } else {
      return nameTestArray[currentRound - Object.keys(namedExercise).length * 2 * (circuit - 1)];
    }
  }

  upcomingState() {
    const { nameTestArray, totalRounds } = this.props;
    const list = [].concat(...Array(totalRounds).fill(nameTestArray))
    return list.slice(0, -1);
  }

  makeRepeated(arr, repeats) {
    Array.from({ length: repeats }, () => arr).flat();
  }

  currentStage() {
    const { currentRound, namedExercise, totalRounds } = this.props;
    const circuit = Math.ceil((+currentRound + 1) / (Object.keys(namedExercise).length * 2));
    return `Round ${circuit}/${totalRounds}`;
  }

  render() {
    const { namedExercise } = this.props;
    const emptyName = namedExercise.map(exercise => Object.values(exercise)[1]).toString() !== '';
    if (!isEmptyObject(namedExercise)) {
      return <p className="state--empty">Add Exercises</p>;
    }
    if (!emptyName) {
      return <p className="state--empty">Add Exercises</p>;
    }
    return (
      <>
        <h3 className="state--subtitle">Current Exercise | {this.currentStage()}</h3>
        <p className="state">{this.namedState()}</p>
        <h3 className="state--subtitle" style={{ marginTop: '2rem' }}>Up Next</h3>
        <ul className="upcoming" style={{ textTransform: 'capitalize' }}>
          {this.upcomingState().map((test, i) => (
            i > this.props.currentRound && (
              <li key={i}>{test}</li>
            )
          ))}
          <div className="gradientback" />
        </ul>
      </>
    );
  }
}

export default TimerState;