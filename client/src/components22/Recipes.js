import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Recipe extends Component {

  render() {
	const reciplesList = [];
	for(let i = 0; i < recipesArr.length; i++){
		const cocktail = <Cocktail cockTailId={i} make={this.makeDrink} />
		recipesList.push(cocktail)
	}
    return (
      <div className="Recipes">
        {recipesList}
      </div>
    );
  }
}

export default hot(module)(Recipes);