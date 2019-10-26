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



handleChange = (event, input) => {
  event.preventDefault();
  this.setState({
    newMeal: {
      ...this.state.newMeal,
      [input]: event.target.value
    },
  })
}

addMeal = (event) => {
    this.props.dispatch({type: 'POST_MEAL', payload: this.state.newMeal})
    console.log('in addMeal', this.state.newMeal);
    alert(`You've added a meal`);
    this.props.history.push('/meals');
  }

  addIngredient = (event) => {
    console.log('this is addIngredient');
    this.setState({
      ingredients: [...this.state.ingredients, '']
    });
  }

  render() {
    return(
      <div>
    <p>
      Add meal
    </p>

    {/* <form onSubmit={this.addMeal}> */}
      <input type='text' value={this.state.newMeal.name} onChange={(event) => {this.handleChange(event, 'name')}} placeholder="name of meal"/>
      <input type='text' value={this.state.newMeal.singleIngredient} onChange={(event) => {this.handleChange(event, 'singleIngredient')}} placeholder="ingredient"/>

      {this.state.ingredients.map((ingredient, index) => {
        return <div key={index}>
        <input value={ingredient}/>
        </div>
      })}
      <button onClick={(event) => this.addIngredient(event)}>Add Ingredient</button>
      <input type='text' value={this.state.newMeal.recipe} onChange={(event) => {this.handleChange(event, 'recipe')}} placeholder="recipe instructions"/>
      <input type='submit' placeholder='Add Meal'/>
    {/* </form> */}
   
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(AddMeal);