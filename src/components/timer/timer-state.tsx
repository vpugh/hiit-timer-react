import React from 'react';
import { isEmptyObject } from '../../shared/isEmpty';

export default function TimerState(props):JSX.Element {
  const namedState = () => {
    const { currentRound, nameTestArray, namedExercise } = props;
    const circuit = Math.ceil((currentRound + 1) / (Object.keys(namedExercise).length * 2));
    if (nameTestArray[currentRound + 1] <= Object.keys(namedExercise).length * 2) {
      return nameTestArray[currentRound];
    } else {
      return nameTestArray[currentRound - Object.keys(namedExercise).length * 2 * (circuit - 1)];
    }
  }

  const upcomingState = () => {
    const { nameTestArray, totalRounds } = props;
    const list = [].concat(...Array(totalRounds).fill(nameTestArray))
    return list.slice(0, -1);
  }

  const currentStage = () => {
    const { currentRound, namedExercise, totalRounds } = props;
    const circuit = Math.ceil((+currentRound + 1) / (Object.keys(namedExercise).length * 2));
    return `Round ${circuit}/${totalRounds}`;
  }

    const emptyName = props.namedExercise.map(exercise => Object.values(exercise)[1]).toString() !== '';

    if (!isEmptyObject(props.namedExercise)) {
      return <p className="state--empty">Add Exercises</p>;
    }
    if (!emptyName) {
      return <p className="state--empty">Add Exercises</p>;
    }
    return (
      <>
        <h3 className="state--subtitle">Current Exercise | {currentStage()}</h3>
        <p className="state">{namedState()}</p>
        <h3 className="state--subtitle" style={{ marginTop: '2rem' }}>Up Next</h3>
        <ul className="upcoming" style={{ textTransform: 'capitalize' }}>
          {upcomingState().map((test, i) => (
            i > props.currentRound && (
              <li key={i}>{test}</li>
            )
          ))}
          <div className="gradientback" />
        </ul>
      </>
    )
}