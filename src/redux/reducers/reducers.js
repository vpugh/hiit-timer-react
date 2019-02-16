import * as actionTypes from '../actions/action-types';

const initialState = {
  restTime: 2,
  workTime: 4,
  rounds: 2,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TIMER:
      return {
        ...state
      };
    case actionTypes.UPDATE_TIMER:
      return {
        ...state,
        restTime: action.restTime,
        workTime: action.workTime,
        rounds: action.rounds,
      };
    default:
      return state;
  }
}

export default reducer;