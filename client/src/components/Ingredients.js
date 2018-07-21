import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Ingredient extends Component {
  render() {
    return (
      <div className="Ingredient">
        <h1>Ingredients</h1>
      </div>
    );
  }
}

export default hot(module)(Ingredient);
