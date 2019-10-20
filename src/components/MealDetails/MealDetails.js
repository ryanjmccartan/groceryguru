import React, {Component} from 'react';
import {connect} from 'react-redux';



class MealDetails extends Component {

state = {
  mealChange: {
    newName: '',
    newRecipe: '',
    id: this.props.reduxState.singleMeal
  }
}

handleChange = (event, input) => {
  this.setState({
    mealChange: {
      ...this.state.mealChange, 
      [input]: event.target.value
    }
  })
}

updateMeal = (meal) => {
  console.log('in updateMeal', meal);
  this.props.dispatch({type: 'EDIT_MEAL', payload: meal});
  alert('Meal has been updated');
  this.props.history.push('/meals');
}

addIngredients = (ingredient) => {
  this.props.dispatch({type: 'FETCH_INGREDIENT', payload: ingredient}) 
}


  render() {
    return(
      <div>
       {this.props.reduxState.mealReducer.map(meal => {
         if(meal.id == this.props.match.params.id){
           return <div>
             <p>Meal name: {meal.meal_name}</p>
             <p>Ingredients: {meal.ingredient_name}</p>
             <p>Recipe: {meal.recipe}</p>
             <button onClick={this.addIngredients(meal.ingredient_name)}>Add Ingredients to Grocery List</button>
             </div>
         }
       })} 
       <input onChange={(event) => this.handleChange(event, 'newName')} placeholder='change name'/>
       <input onChange={(event) => this.handleChange(event, 'newRecipe')} placeholder='change recipe'/>
       <button onClick={() => this.updateMeal(this.state.mealChange)}>Update Meal</button>
       <br/>
      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(MealDetails);