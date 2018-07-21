import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Inventory from './Inventory.js';
import Content from './Content.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Inventory />
        <Content />
      </div>
    );
  }
}

export default hot(module)(App);
