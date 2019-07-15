import React, { useContext } from 'react';
import Navigation from './components/navigation/navigation';
import Main from './Main';
import './app.scss';
import { ThemeContext } from './contexts/ThemeContext';

const App = () => {
  const theme = useContext(ThemeContext);
  const themeColor = theme.chosenTheme;
  const gradient = theme[themeColor].gradient;

  return (
    <div
      className="innerBody"
      style={{
        background: gradient
      }}
    >
      <Navigation />
      <Main />
    </div>
  );
};

export default App;