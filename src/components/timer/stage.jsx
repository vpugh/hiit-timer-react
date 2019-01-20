import React from 'react';
import PropTypes from 'prop-types';

class Stage extends React.Component {

  currentStage() {
    const { currentRound, namedExercise, totalRounds } = this.props;
    const circuit = Math.ceil((+currentRound + 1) / (namedExercise.length * 2));
    return `Round ${circuit}/${totalRounds}`;
  }

  render() {
    return (
      <div className="stage">{this.currentStage()}</div>
    );
  }
}

Stage.propTypes = {
  currentRound: PropTypes.number.isRequired,
  namedExercise: PropTypes.array.isRequired,
  totalRounds: PropTypes.number.isRequired,
}

export default Stage;