import React from 'react';
import PropTypes from 'prop-types';

class Stage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.currentStage = this.currentStage.bind(this);
  }

  currentStage() {
    const { round, numberOfExercise, rounds } = this.props;
    const circuit = Math.ceil((+round + 1) / (numberOfExercise * 2));
    return "Round " + circuit + "/" + rounds;
  }

  render() {
    return (
      <div className="stage">{this.currentStage()}</div>
    );
  }
}

Stage.propTypes = {
  round: PropTypes.number.isRequired,
  numberOfExercise: PropTypes.number.isRequired,
  rounds: PropTypes.number.isRequired,
}

export default Stage;