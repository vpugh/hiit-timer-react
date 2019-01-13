import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/login">Login/Signup</Link>
            </li>
          </ul>
          <Route path="/settings" />
          <Route path="/login" />
        </nav>
        
      </Router>
    )
  }
}

export default Navigation;