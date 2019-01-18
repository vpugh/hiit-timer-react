import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.scss';

const navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/">Timer</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/login">Login/Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navigation;