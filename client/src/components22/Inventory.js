import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Item from './Item.js';

class Inventory extends Component {
  render() {
  	let inventoryList = []; 
	for(let i = 0; i < this.props.items.length; i++){
		const item = <Item key={i} itemId={i} name={this.props.items[i].name} quantity={this.props.items[i].quantity} add={this.props.addItem}/>
		inventoryList.push(item)
	}
    return (
      <div className="Inventory">
        <h1>INVENTORY</h1>
          {inventoryList}
      </div>
    );
  }
}

export default hot(module)(Inventory);