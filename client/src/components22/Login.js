import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import MainPage from './MainPage.js';
import App from './App.js';

class Login extends Component {

  constructor(props){
  	super(props);
  	this.state = {
  		hasUser: false,
  		username: null, 
  		password: null, 
  		userId: null,
  		failedLogin: false, 
  		items: []
  	};
  	//this.handleSignUp = this.handleSignUp.bind(this);
  	this.handleLogin = this.handleLogin.bind(this);
  	// this.getItems = this.getItems.bind(this);
  	// this.addItems = this.addItems.bind(this); 
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

  handleLogin(username, password){
  	//CHECK THE DATABASE TO SEE IF USER EXISTS
  	//IF YES TAKE TO THE MAIN PAGE
  	//IF NOT TAKE DISPLAY USER NOT FOUND TRY AGAIN
  	console.log("UNPW", username, password)
  	alert("HELLO")
  	fetch('http://localhost:4000/login', {
  		method: "GET",
  		data: {
  				  username: this.state.username,
				  password: this.state.password
  			   },
  		headers: {
  			"Content-Type": "application/json; charset=utf-8"
  		},
  		body: JSON.stringify(data)
  	})
  	.then(res => {
  		if(res.body.userId){
  			this.setState({ 
  							hasUser: true,
					  		username: data.username, 
					  		userId: data.userId,
					  		failedLogin: false,
					  		items: []
						  })
  		} else {
  			this.setState({ 
  							hasUser: false,
					  		username: null, 
					  		userId: null,
					  		failedLogin: true,
					  		items: []
					  	  })
  		}
  	})
  	.catch(err => {
  		return err;
  	})
  }

  handleChange(event){
  	let username = getElementByName('name1'); 
  }

  handleSignUp(){
  	//CHECK THE DATABASE TO SEE IF USER EXISTS
  	//IF YES THEN DISPLAY USER EXISTS PLEASE LOGIN IN 
  	//IF NO THE ADD USERNAME AND PW IN THE USERS TABLE
  	//THEN TAKE THE USER TO THE MAIN PAGE
	  	fetch('http://localhost:4000/login', {
	  		method: "POST",
	  		data:  {
	  				username: this.state.username,
  					password: this.state.password
	  			   },
	  		headers: {
	  			"Content-Type": "application/json; charset=utf-8"
	  		},
	  		body: JSON.stringify(data)
	  	})
	  	.then(res => {
			this.setState({ hasUser: true,
					  		username: data.username, 
					  		userId: data.userId,
					  		failedLogin: false, 
					  		items: []
						  })
	  	})
	  	.catch(err => {
	  		return err;
	  	})
  }
  render() {
    return (
    	// this.state.hasUser === true? <App getItems={this.getItems} addItems={this.addItems} getQuantity={this.getQuantity}/> : 
    	<div>
    	<p>HELLO</p>
    	<MainPage handleLogin={this.handleLogin} un={this.state.username} pw={this.state.password} />
    	</div>
    	//signUp={this.handleSignUp} login={this.handleLogin} failedLogin={this.state.failedLogin} /> 
    )
  }
}

export default hot(module)(Login);