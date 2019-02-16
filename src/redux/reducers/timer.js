import * as actionTypes from '../actions/action-types';

const initialState = {
  restTime: 10,
  workTime: 20,
  rounds: 3,
  isFetching: false,
  failed: false,
  messages: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WORKTIME_REQUEST:
    case actionTypes.FETCH_RESTTIME_REQUEST:
    case actionTypes.UPDATE_TIMER_REQUEST:
      return {
        ...state,
        isFetching: true,
        failed: false,
      };
    case actionTypes.FETCH_WORKTIME_SUCCESS:
    case actionTypes.FETCH_RESTTIME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        failed: false,
        message: action.message,
      };
    case actionTypes.UPDATE_TIMER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        restTime: action.restTime,
        workTime: action.workTime,
        rounds: action.rounds,
      };
    case actionTypes.FETCH_WORKTIME_FAILURE:
    case actionTypes.FETCH_RESTTIME_FAILURE:
    case actionTypes.UPDATE_TIMER_FAILURE:
      return {
        ...state,
        isFetching: false,
        failed: true,
        message: action.errors,
      };
    default:
      return state;
  }
}

export default reducer;