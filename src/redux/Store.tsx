import React, {createContext, useReducer, useEffect, Fragment} from 'react';
import { IState } from '../interfaces';
import * as actionTypes from './actions/action-types';

const initialState:IState = {
  exercises:[],
  timer:[],
}

const timerDefault = [{
  restTime: 6,
  workTime: 4,
  rounds: 2,
}]

const exerciseDefault = [{
  index: 0,
  name: '', 
}]


export const Store = createContext<IState | any>(initialState);

function reducer(state, action) {
  switch(action.type) {
    case actionTypes.FETCH_SESSIONS:
      return {
        ...state,
        exercises: state.exercises,
      };
    case actionTypes.UPDATE_SESSION:
      return {
        ...state,
        exercises: action.exercises,
      }
    case actionTypes.ADD_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.concat({
          index: state.exercises.length,
          name: '',
        }),
      }
    case actionTypes.DELETE_EXERCISE:
      const updatedExercises = state.exercises.filter(session => session.index !== action.index);
      return {
        ...state,
        exercises: updatedExercises,
      }
    case actionTypes.UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map((exercise, id) => id === action.id ? {...exercise, name: action.exercise} : exercise),
      }
    case actionTypes.FETCH_TIMER:
        return {
          ...state,
          timer: state.timer,
        }
    case actionTypes.UPDATE_TIMER:
      return {
        ...state,
        timer: [{
          restTime: action.restTime,
          workTime: action.workTime,
          rounds: action.rounds,
        }]
      }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, {}, () => {
    const localDataExercise = localStorage.getItem('exercises');
    const localDataTimer = localStorage.getItem('timer');
    if (localDataExercise && localDataTimer) {
      return (
        {
          exercises: JSON.parse(localDataExercise),
          timer: JSON.parse(localDataTimer),
        }
      )
    }
    if (localDataExercise) {
      return (
        {
          exercises: JSON.parse(localDataExercise),
          timer: timerDefault,
        }
      )
    }
    if (localDataTimer) {
      return (
        {
          exercises: exerciseDefault,
          timer: JSON.parse(localDataTimer),
        }
      )
    }
    return (
      {
        exercises: exerciseDefault,
        timer: timerDefault,
      }
    ) 
  });
  
  return <Store.Provider value={{state, dispatch}}><Fragment>
    {props.children}
  </Fragment></Store.Provider>
}