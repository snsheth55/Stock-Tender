import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Ingredient from './Ingredients.js';
import Product from './Products.js';

class Content extends Component {
  render() {
    return (
      <div>
        <h1>Content</h1>
        <div className="Content">
          <Ingredient />
          <Product />
        </div>
      </div>
    );
  }
}

export default hot(module)(Content);
