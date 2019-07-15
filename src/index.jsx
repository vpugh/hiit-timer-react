import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import { StoreProvider } from './redux/Store';
import ThemeContentProvider from './contexts/ThemeContext';

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <ThemeContentProvider>
        <App />
      </ThemeContentProvider>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('app')
);