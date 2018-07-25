import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

//ONE ITEM FROM A LIST CONTAINING ALL INVENTORY

class Item extends Component {
	constructor(props){
	  super(props)
	}
  render() {
    return (
      <form className="Item">
      	 <div>
      	 <p>ITEM:   {this.props.name}</p>
      	 <p>STOCK:   {this.props.quantity}</p>
      	 </div>
     	 <input type="number" amount="amount" placeholder="Amount To Add" />
     	 <input type="submit" value="ADD ITEM" />
      </form>
    );
  }
}

export default hot(module)(Item);