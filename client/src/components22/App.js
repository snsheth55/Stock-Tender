import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Inventory from './Inventory.js';
import Item from './Item.js';

class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		hasUser: false,
  		username: null, 
  		password: null, 
  		userId: null,
  		failedLogin: false, 
  		items: [{name: "VODKA", quantity: 5},{name: "RUM", quantity: 10},{name: "WHISKEY", quantity: 4}]
  	};
  	//this.handleSignUp = this.handleSignUp.bind(this);
  	//this.handleLogin = this.handleLogin.bind(this);
  	 this.getItems = this.getItems.bind(this);
  	 this.addItems = this.addItems.bind(this); 
  	// this.getQuantity = this.getQuantity.bind(this); 
  	//this.getRecipes = this.getRecipes.bind(this);
  	//this.makeDrink = this.makeDrink.bind(this); 
  }

  getItems(){
  	//send a get reqest to the server for Items tables
  	//ASK FOR ALL THE ITEMS 
  	//THIS WILL BE STATIC
  	//the response object will have an array of all the items with there ids
  	//store items object inside items array in the state
  	fetch('http://localhost:4000/login', {
  		method: "GET",
  		headers: {
  			"Content-Type": "application/json; charset=utf-8"
  		},
  		data: {
			    userId: this.state.userId, 
			    reason: 'getItems'
			  },
  		body: JSON.stringify(data)
  	})
  	.then(res => {
  		let newList = [];
  		for(let i = 0; i < res.body.items.length; i++){
  			let newObj = {}
  			newObj.name = res.body.items[i].name; 
  			newObj.quantity = res.body.items[i].quantity; 
  			newList.push(newObj)
  		}
  		this.setState({items: newList})
		})
  	.catch(err => {
  		return err; 
  	})	
  }

  addItems(itemId, amount){
  	//post request to the server with userID, itemID
  	fetch('http://localhost:4000/login', {
  		method: "POST",
  		headers: {
  			"Content-Type": "application/json; charset=utf-8"
  		},
  		data: {
 				  userId: this.state.userId,
 				  itemId: itemId, 
 				  amount: amount, 
  				  reason: 'addItem'
			  },
  		body: JSON.stringify(data)
  	})
  	.then(
  		//getItems()
  	)
  	.catch(err => {
  		return err; 
  	})	
  }
  render() {
    return (
      <div className="App">
        <Inventory getItems={this.props.getItems} addItem={this.props.addItems} items={this.state.items} />
      </div>
    );
  }
}

export default hot(module)(App);