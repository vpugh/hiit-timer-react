import * as actionTypes from '../actions/action-types';

const initialState = {
  exercises: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SESSIONS:
      return {
        ...state,
        exercises: state.exercises,
      };
    case actionTypes.UPDATE_SESSION:
      return {
        ...state,
        exercises: action.exercises,
      };
    case actionTypes.ADD_EXERCISE:
      const generateId = Math.floor((Math.random() * 100) + 1);
      return {
        ...state,
        exercises: state.exercises.concat({ id: generateId, name: '', index: state.exercises.length }),
      };
    case actionTypes.UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map(
          (exercise, id) => id === action.id ? {
            ...exercise, name: action.exercise
          } : exercise
        ),
      }
    case actionTypes.DELETE_SESSION:
      const updatedArray = state.exercises.filter(session => session.id !== action.session);
      return {
        ...state,
        exercises: updatedArray,
      };
    default:
      return state;
  }
};

export default reducer;
