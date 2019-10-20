import React, {Component} from 'react';
import {connect} from 'react-redux';



class MealDetails extends Component {

state = {
  mealChange: {
    newName: '',
    newRecipe: '',
    id: this.props.reduxState.mealReducer.meal_id
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
  // alert('Meal has been updated');
  this.props.history.push('/meals');
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
             </div>
         }
       })} 
       <input onChange={(event) => this.handleChange(event, 'newName')} placeholder='change name'/>
       <input onChange={(event) => this.handleChange(event, 'newRecipe')} placeholder='change recipe'/>
       <button onClick={() => this.updateMeal(this.state.mealChange)}>Update Meal</button>
      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(MealDetails);