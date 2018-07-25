import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Cocktail extends Component {

  render() {
  const ingredientsList = [];
  let ingredients = this.getIngredients(i); 
  for(let i = 0; i < ingredients.length; i++){
    const ingredients = <Ingredient ingredientId={i} name={ingredients[i]} />
    ingredientList.push(ingredient)
  }
    return (
      <div className="cocktail">
        {ingredientList}
        <input type="submit" value="MAKE DRINK" onClick={this.make}/>
      </div>
    );
  }
}

export default hot(module)(Recipes);