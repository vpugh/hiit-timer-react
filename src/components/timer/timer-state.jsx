import React from 'react';
import PropTypes from 'prop-types';

class TimerState extends React.Component {

  namedState() {
    const { currentRound, nameTestArray, totalExercises, namedExercise, totalRounds } = this.props;
    console.log('State', currentRound, namedExercise.length, totalExercises);
    const r = namedExercise.length / totalRounds;
    console.log('Level', r, namedExercise.length * 2, totalRounds);
    if (nameTestArray && currentRound < ((namedExercise.length * 2) - 1)) {
      if (currentRound % 2 === 0) {
        return 'odd' + nameTestArray[currentRound];
      } else {
        return 'even' + nameTestArray[currentRound];
      }
    } else {
      return 'round 2';
    }
    // if (nameTestArray) {
    //   return nameTestArray[totalExercises];
    // }
  }

  upcomingState() {
    const { nameTestArray, totalExercises } = this.props;
    console.log('upcoming', nameTestArray);
  }

  render() {
    const {
      namedExercise,
    } = this.props;
    return (
      <>
        <h3
          style={{ marginBottom: '0', marginTop: '3rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1.3px'}}
        >Current Exercise</h3>
        <p className="state">{this.namedState()}</p>
        <h3
          style={{ marginBottom: '0', marginTop: '3rem', textTransform: 'uppercase', fontSize: '1rem', letterSpacing: '1.3px'}}
        >Up Next</h3>
        {/* <ul>
          {namedExercise.map((test, i) => <li key={i}>{test}</li>)}
        </ul> */}
        <ul className="upcoming">
          {namedExercise.map((test, i) => (
            i > this.props.currentRound && (
              <li key={i}>{test}</li>
            )
          ))}
        </ul>
        {/* <p className="state" style={{ fontSize: '1.8rem' }}>{this.upcomingState()}</p> */}
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