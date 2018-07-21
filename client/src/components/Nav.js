import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <ul>
          <li>Home</li>
          <li>Sign-In</li>
          <li>Sign-Up</li>
        </ul>
      </div>
    );
  }
}

export default hot(module)(Nav);
