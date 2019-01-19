import React from 'react';
import PropTypes from 'prop-types';

class TimerState extends React.Component {

  namedState() {
    const { currentRound, nameTestArray } = this.props;
    console.log(currentRound);
    if (nameTestArray) {
      return nameTestArray[currentRound];
    }
  }

  render() {

    return (
      <>
        <div className="state">{this.namedState()}</div>
      </>
    );
  }
}

TimerState.propTypes = {
  currentRound: PropTypes.number.isRequired,
  totalExercises: PropTypes.array.isRequired,
  exercises: PropTypes.number.isRequired,
};

export default TimerState;