import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Ingredient from './Ingredients.js';
import Product from './Products.js';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <h1>Content</h1>
        <Ingredient />
        <Product />
      </div>
    );
  }
}

export default hot(module)(Content);
