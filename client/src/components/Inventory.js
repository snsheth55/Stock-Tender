import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Inventory extends Component {
  render() {
    return (
      <div className="Inventory">
        <h1>Modify inventory</h1>
        <form action="/items" method="post">
          <input placeholder="Item Name" type="text" name="name" />
          <input placeholder="Quantity" type="number" name="quantity" />
          <input type="submit" value="Change Inventory" />
        </form>
        <form action="/products" method="post">
          <input placeholder="Product Name" type="text" name="product" />
          <input type="submit" value="Add Product" />
        </form>
      </div>
    );
  }
}

export default hot(module)(Inventory);
