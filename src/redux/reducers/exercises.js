import * as actionTypes from '../actions/action-types';

const initialState = {
  exercises: [
    {
      index: 0,
      name: '', 
    }
  ]
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
      return {
        ...state,
        exercises: state.exercises.concat({ name: '', index: state.exercises.length }),
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
    case actionTypes.DELETE_EXERCISE:
      const updatedExercises = state.exercises.filter(session => session.index !== action.index);
      return {
        ...state,
        exercises: updatedExercises,
      };
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
