import React from 'react';
import PropTypes from 'prop-types';

class TimerState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentState = this.currentState.bind(this);
  }

  currentState() {
    const { round, exercise, numberOfExercise } = this.props;
    const position = exercise[round],
    circuit = Math.ceil((+round + 1) / (numberOfExercise * 2)),
    truePosition = exercise[round] + 1 <= numberOfExercise * 2
    ? position
    : exercise[round - numberOfExercise * 2 * (circuit - 1)];
    if (truePosition % 2 === 0) {
      return "Exercise";
    } else {
      return "Rest";
    }
  }

  render() {

    return (
      <div className="state">{this.currentState()}</div>
    );
  }
}

export default TimerState;