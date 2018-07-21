import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Inventory extends Component {
  render() {
    return (
      <div className="Inventory">
        <h1>Modify inventory here</h1>
      </div>
    );
  }
}

export default hot(module)(Inventory);
