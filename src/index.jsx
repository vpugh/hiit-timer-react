import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.scss';
import App from './App';

import { createStore, combineReducers } from 'redux';
import reducers from './redux/reducers/reducers';
import { composeWithDevTools} from 'redux-devtools-extension';

import timerReducer from './redux/reducers/timer';
import exerciseReducer from './redux/reducers/exercises';

const rootReducer = combineReducers({
  time: timerReducer,
  exe: exerciseReducer
})

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('app')
);