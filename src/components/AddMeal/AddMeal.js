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

addMeal = (event) => {
    this.props.dispatch({type: 'POST_MEAL', payload: this.state.newMeal})
    console.log('in addMeal', this.state);
  //   swal({
  //     title: 'You added a meal!',
  //     icon: 'success'
  //   });
  //   this.props.history.push('/meals');
  // }
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
    <p>
      Add meal
    </p>

    {/* <form onSubmit={this.addMeal}> */}
      <input type='text' value={this.state.newMeal.name} onChange={(event) => {this.handleChange(event, 'name')}} placeholder="name of meal"/>
      <input type='text' value={this.state.newMeal.image} onChange={(event) => {this.handleChange(event, 'image')}} placeholder="image url"/>
      {/* <input type='text' value={this.state.newMeal.singleIngredient} onChange={(event) => {this.handleChange(event, 'singleIngredient')}} placeholder="ingredient"/> */}

      {this.state.newMeal.ingredients.map((ingredient, index) => {
        return <div key={index}>
        <input value={ingredient} onChange={(event) => {this.handleIngredientChange(event, index)}} placeholder='ingredient' />
        </div>
      })}
      <button onClick={(event) => this.addIngredient(event)}>Add Ingredient</button>
      <input type='text' value={this.state.newMeal.recipe} onChange={(event) => {this.handleChange(event, 'recipe')}} placeholder="recipe instructions"/>
      <button onClick={this.addMeal} type='submit' placeholder='Add Meal'>Submit</button>
    {/* </form> */}
   
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(AddMeal);