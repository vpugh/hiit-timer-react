import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';
import { ThemeContext } from '../../contexts/ThemeContext';

const navigation = () => {
  const theme = useContext(ThemeContext);
  const themeColor = theme.chosenTheme;
  const linkColor = theme[themeColor].bgLink;
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName='is-active' style={{ color: linkColor }}>Timer</NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName='is-active' style={{ color: linkColor }}>Settings</NavLink>
        </li>
        {/* <li>
          <NavLink to="/login" activeClassName='is-active'>Login/Signup</NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default navigation;