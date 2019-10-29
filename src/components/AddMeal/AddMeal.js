import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';



class AddMeal extends Component {

state = {
  newMeal: {
    name: '',
    image: '',
    recipe: '',
    ingredients: []
  }
}


handleChange = (event, input) => {
  event.preventDefault();
  this.setState({
    newMeal: {
      ...this.state.newMeal,
      [input]: event.target.value
    },
  })
}

fillState = () => {
  this.setState({
    newMeal: {
      name: 'Enchiladas',
      image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/10/1/0/WU0308H_simple-perfect-enchiladas_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382541970364.jpeg',
      recipe: `* For the sauce:
* In a saucepan over medium-low heat, combine the canola oil and flour. Whisk together and allow to bubble for 1 minute. Pour in the red sauce, chicken broth, salt and pepper. Bring to a boil. Reduce the heat and simmer while you prepare the other ingredients.
* For the meat:
* While the sauce is simmering, brown the ground beef with the onions in a large skillet over medium-high heat. Drain the fat, add the salt and stir to combine. Turn off the heat and set aside.
* For the rest:
* In a small skillet over medium heat, heat some canola oil. Lightly fry the tortillas just until soft. Do not crisp. Drain on a paper towel-lined plate. Repeat until all the tortillas have been fried.
* Preheat the oven to 350 degrees F.
* Spread 1/2 cup of the sauce in the bottom of a 9- by 13-inch baking dish. Next, one at a time, dip each tortilla into the sauce. Set the sauce-soaked tortilla on a plate. Place on some of the meat mixture, chilies, green onions and black olives. Top with a generous portion of grated Cheddar. Roll up the tortilla to contain the filling inside.
* Place the tortilla seam side down in the baking dish. Repeat with the rest of the tortillas and pour the remaining sauce over the top. End with a generous sprinkling of cheese and any other bits of chiles, green onions or olives you have left over from the filling.
* Bake the enchiladas for 20 minutes, or until bubbly. Sprinkle chopped cilantro over the top and serve.
`,
      ingredients: ['1 pound ground beef', '1 onion', '2 4-oz cans of green chilies', '1 cup green onions', '3 cups cheddar cheese', '1 28-oz can enchilada sauce']
    }
  })
}

addMeal = (event) => {
    this.props.dispatch({type: 'POST_MEAL', payload: this.state.newMeal})
    console.log('in addMeal', this.state);
    swal({
      title: 'You added a meal!',
      icon: 'success'
    });
    this.props.history.push('/meals');
  }

  addIngredient = (event) => {
    this.setState({
      newMeal: {
        ...this.state.newMeal,
      ingredients: [...this.state.newMeal.ingredients, '']
      }
    });
  }

  handleIngredientChange = (event, index) => {
    this.state.newMeal.ingredients[index] = event.target.value
    this.setState({
      newMeal:{
        ...this.state.newMeal,
        ingredients: this.state.newMeal.ingredients
      }
    })
  }

  render() {
    return(
      <div>
    <h3 onClick={this.fillState}>
      Add meal
    </h3>
      <h4>Name:</h4>
      <input type='text' value={this.state.newMeal.name} onChange={(event) => {this.handleChange(event, 'name')}} placeholder="name of meal"/>
      <br/>
      <input type='text' value={this.state.newMeal.image} onChange={(event) => {this.handleChange(event, 'image')}} placeholder="image url"/>
      <br/>
      <h4>Ingredients to add:</h4>
      {this.state.newMeal.ingredients.map((ingredient, index) => {
        return <div key={index}>
        <input value={ingredient} onChange={(event) => {this.handleIngredientChange(event, index)}} placeholder='ingredient' />
        </div>
      })}
      <button onClick={(event) => this.addIngredient(event)}>Add Ingredient</button>
      <br/>
      <br/>
      <h4>Recipe:</h4>
      <input type='text' value={this.state.newMeal.recipe} onChange={(event) => {this.handleChange(event, 'recipe')}} placeholder="recipe instructions"/>
      <br/>
      <button onClick={this.addMeal} type='submit' placeholder='Add Meal'>Submit</button>
   
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(AddMeal);