import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//create array of ingredients from DB query

//inside of returned div render array of ingredients
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
