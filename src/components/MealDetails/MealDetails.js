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
  console.log('in updateMeal', this.state.mealChange);
  this.props.dispatch({type: 'EDIT_MEAL', payload: meal});
  alert('Meal has been updated');
  this.props.history.push('/meals');
}

addIngredients = (ingredient) => {
  console.log(ingredient)
  this.props.dispatch({type: 'SET_INGREDIENT', payload: ingredient})
  alert('Ingredients added to list'); 
}

deleteMeal = (meal) => {
  this.props.dispatch({type: 'DELETE_MEAL', payload: meal});
  alert('Meal has been deleted');
  this.props.history.push('/meals');
}


  render() {
    return(
      <div>
       {this.props.reduxState.mealReducer.map(item => {
          if(item.meal_id == this.props.match.params.id || item.id == this.props.match.params.id){           
            return <div key={item.id}>
             <p>Meal name: {item.meal_name}</p>
             <p>Ingredients: {item.ingredient_name}</p>
             <p>Recipe: {item.recipe}</p>
             <button onClick={() => this.addIngredients(item.ingredient_name)}>Add Ingredients to Grocery List</button>
             <button onClick={() => this.deleteMeal(item.meal_id)}>Delete Meal</button>
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