import React, {createContext, useReducer} from 'react';
import { IState, IExercise, ITimer } from '../interfaces';
import * as actionTypes from './actions/action-types';

const initialState:IState = {
  exercises:[],
  timer:[],
}

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
          name: '',
          index: state.exercises.length,
        }),
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
        timer: {
          restTime: action.restTime,
          workTime: action.workTime,
          rounds: action.rounds,
        }
      }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    exercises: [
      {
        index: 0,
        name: '', 
      }
    ],
    timer: [
      {
        restTime: 2,
        workTime: 4,
        rounds: 2,
      }
    ]
  });
  return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}