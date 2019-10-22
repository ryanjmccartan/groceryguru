import React, {Component} from 'react';
import {connect} from 'react-redux';



class MealDetails extends Component {

componentDidMount() {
  this.getIngredient();
}  

getIngredient = () => {
  console.log('this is params id', this.props.match.params.id);
  this.props.dispatch({type: 'GET_INGREDIENT', payload: this.props.match.params.id});
}

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
       {this.props.reduxState.mealReducer.map(meal => {
          if(meal.id == this.props.match.params.id){ 
            // || meal.id == this.props.match.params.id){           
            return <div key={meal.id}>
             <p>Meal name: {meal.meal_name}</p>
             <p>Recipe: {meal.recipe}</p>
             {/* <button onClick={() => this.addIngredients(item.ingredient_name)}>Add Ingredients to Grocery List</button> */}
             <button onClick={() => this.deleteMeal(meal.meal_id)}>Delete Meal</button>
             </div>
         }
       })}
                  {/* {JSON.stringify(this.props.reduxState.ingredientReducer)} */}
       Ingredients:
       {this.props.reduxState.ingredientReducer.map(ingredient => {
        //  if(ingredient.id){
        return <div key={ingredient.id}>
        {ingredient.ingredient_name}
        </div>
         }
       )} 
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