import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Product extends Component {
  render() {
    return (
      <div className="Product">
        <h1>Products</h1>
      </div>
    );
  }
}

export default hot(module)(Product);
