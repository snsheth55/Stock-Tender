import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Nav from './Nav.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
      </div>
    );
  }
}

export default hot(module)(App);
