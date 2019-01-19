import React from 'react';
import PropTypes from 'prop-types';

class TimerState extends React.Component {

  currentState() {
    const { currentRound, totalExercises, exercises } = this.props;
    const position = `${totalExercises[currentRound]}`;
    const truePosition = position + 1 < exercises * 2;
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

TimerState.propTypes = {
  currentRound: PropTypes.number.isRequired,
  totalExercises: PropTypes.array.isRequired,
  exercises: PropTypes.number.isRequired,
};

export default TimerState;