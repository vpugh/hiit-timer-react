import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';

const navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName='is-active'>Timer</NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName='is-active'>Settings</NavLink>
        </li>
        {/* <li>
          <NavLink to="/login" activeClassName='is-active'>Login/Signup</NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default navigation;