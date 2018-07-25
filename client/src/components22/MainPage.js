import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class MainPage extends Component {

  render() {
  	console.log('HANDLEE LODINGG',this.props.handleLogin)
  	let warning; 
  	// if(this.props.failedLogin){
  	// 	warning = <p>YOU LOGIN ATTEMPT HAS FAILED PLEASE TRY AGAIN</p>
  	// }
  	// this.props.handleLogin

    return (
    	<div>
      <div className="login">
      LOGIN
      	<input onChange={()=>this.handleChange} id="1" type="text" name="name1" placeholder="username" />
        <input onChange={()=>this.handleChange} id="2" type="text" name="password1" placeholder="password" />
        <button onClick={()=>{this.props.handleLogin()}}>LOGIN</button>
      </div>
      <div className="signUp">
      SIGN UP
      	<input id="3" type="text" name="name2" placeholder="username" />
        <input id="4" type="text" name="password2" placeholder="password" />
      </div>
      </div>
    );
  }
}
// onClick={this.props.login(getElementByName('name1'), getElementByName('password1'))} />
//     <input type="submit" value="submit" onClick={this.props.signIn()}/>

export default hot(module)(MainPage);