import React, {Component} from 'react';
import {connect} from 'react-redux';


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
    this.props.dispatch({type: 'POST_MEAL', payload: this.state.newMeal})
    console.log('in addMeal', this.state.newMeal);
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

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(AddMeal);