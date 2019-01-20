import React from 'react';
import PropTypes from 'prop-types';

class TimerState extends React.Component {

  namedState() {
    const { currentRound, nameTestArray, namedExercise } = this.props;
    const circuit = Math.ceil((currentRound + 1) / (namedExercise.length * 2));
    if (nameTestArray[currentRound + 1] <= namedExercise.length * 2) {
      return nameTestArray[currentRound];
    } else {
      return nameTestArray[currentRound - namedExercise.length * 2 * (circuit - 1)];
    }
  }

  upcomingState() {
    const { currentRound, nameTestArray, namedExercise } = this.props;
    const circuit = Math.ceil((currentRound + 1) / (namedExercise.length * 2));
    // {nameTestArray.map((test, i) => (
    //   i > this.props.currentRound && (
    //     <li key={i}>{test}</li>
    //   )
    // ))}
  }

  currentStage() {
    const { currentRound, namedExercise, totalRounds } = this.props;
    const circuit = Math.ceil((+currentRound + 1) / (namedExercise.length * 2));
    return `Round ${circuit}/${totalRounds}`;
  }

  render() {
    const {
      nameTestArray,
    } = this.props;
    return (
      <>
        <h3 className="state--subtitle">Current Exercise | {this.currentStage()}</h3>
        <p className="state">{this.namedState()}</p>
        <h3 className="state--subtitle" style={{ marginTop: '2rem' }}>Up Next</h3>
        <ul className="upcoming" style={{ textTransform: 'capitalize' }}>
          {nameTestArray.map((test, i) => (
            i > this.props.currentRound && (
              <li key={i}>{test}</li>
            )
          ))}
        </ul>
        <p className="state" style={{ fontSize: '1.8rem' }}>{this.upcomingState()}</p>
      </>
    );
  }
}

TimerState.propTypes = {
  currentRound: PropTypes.number.isRequired,
  totalExercises: PropTypes.array.isRequired,
  namedExercise: PropTypes.array.isRequired,
};

export default TimerState;