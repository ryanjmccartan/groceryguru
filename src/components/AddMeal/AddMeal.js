import React, {Component} from 'react';
import axios from 'axios';


class AddMeal extends Component {

state = {
  newMeal: {
    name: '',
    singleIngredient: '',
    recipe: ''
  },
  ingredients: []
  
}

// addIngredient = (event) => {
//   this.state.newMeal.ingredient.push(event.target.value);
// }

handleChange = (event, input) => {
  event.preventDefault();
  this.setState({
    newMeal: {
      ...this.state.newMeal,
      [input]: event.target.value
    },
    // singleIngredient: event.target.value
  })
}

addMeal = (event) => {
    event.preventDefault();
    console.log('in addMeal');
    axios.post('/addmeal', this.state.newMeal).then(response => {
      console.log('this is response', response);
    }).catch(error => {
      console.log('error with post request', error);
    })
  }


  render() {
    return(
      <div>
    <p>
      Add meal
    </p>

    <form onSubmit={this.addMeal}>
      <input type='text' value={this.state.newMeal.name} onChange={(event) => {this.handleChange(event, 'name')}} placeholder="name of meal"/>
      <input type='text' value={this.state.newMeal.singleIngredient} onChange={(event) => {this.handleChange(event, 'singleIngredient')}} placeholder="ingredient"/>
      {/* <button onClick={() => this.addIngredient}>Add Ingredient</button> */}
      <input type='text' value={this.state.newMeal.recipe} onChange={(event) => {this.handleChange(event, 'recipe')}} placeholder="recipe instructions"/>
      <input type='submit' placeholder='Add Meal'/>
    </form>
   
  </div>
    )
  }
}



export default AddMeal;