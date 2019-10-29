import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MealDetails.css';
import swal from 'sweetalert';
import './MealDetails.css';



class MealDetails extends Component {

  state = {
    mealChange: {
      newName: '',
      newRecipe: '',
      id: this.props.match.params.id
    },
    list_id: 1
  }

  componentDidMount() {
    this.props.dispatch({type: 'GET_INGREDIENT', payload: this.props.match.params.id})
    this.props.dispatch({type: 'GET_MEAL_BY_ID', payload: this.props.match.params.id})
    this.props.dispatch({type: 'GET_LIST'});

}  

  componentDidUpdate(preProps) {
    if(this.props.reduxState.singleMealReducer != preProps.reduxState.singleMealReducer){
      this.setMealToEdit();
    }
  }

  setMealToEdit = () => {
    this.props.reduxState.singleMealReducer.forEach(meal => {
      this.setState({
        mealChange: {
          newName: meal.meal_name,
          newRecipe: meal.recipe,
          id: this.props.match.params.id
        }
      })
    })
  }

  // getIngredient = () => {
  //   console.log('this is params id', this.props.match.params.id);
  //   ;
  // }



  handleChange = (event, input) => {
    event.preventDefault();
    this.setState({
      mealChange: {
        ...this.state.mealChange, 
        [input]: event.target.value
      }
    })
  }

  handleListChange = (event) => {
    this.setState({
      list_id: event.target.value
    })
  }

  updateMeal = (event) => {
    event.preventDefault();
    console.log('in updateMeal', this.state.mealChange);
    this.props.dispatch({type: 'EDIT_MEAL', payload: this.state.mealChange});
    alert('Meal has been updated');
    this.props.history.push('/meals');
  }

  addIngredients = (meal) => {
    console.log(meal)
    this.props.dispatch({type: "POST_MEAL_ID", payload:  meal})
        this.props.history.push('/meals/addlist/' + meal)

    // alert('Ingredients added to list'); 
  }

  deleteMeal = (meal) => {
    swal({
      title: "Do you want to delete this meal?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.dispatch({type: 'DELETE_MEAL', payload: meal});
        swal("This meal has been removed!", {
          icon: "success",
        });
        this.props.history.push('/meals');
      } else {
        swal("Your meal is safe and sound!");
      }
    });
  }

  addToList = (event, item) => {
    console.log(item);
    let newObject = {
      ingredients: item.ingredient_name,
      id: this.state.list_id,
    }
    this.props.dispatch({type: 'POST_INGREDIENTS_FROM_MEAL', payload: newObject});
    swal({
      title: 'Ingredient added.',
      icon: 'success'
    });; 
  }

  render() {
    return(
      <div>
       {this.props.reduxState.mealReducer.map(meal => {
          if(meal.id == this.props.match.params.id){ 
            return <div className='image' key={meal.id}>
              <img src={meal.image}/>
             <h3>{meal.meal_name}</h3>
             <br/>
             <h5>Recipe:</h5> {meal.recipe}
             </div>
         }
       })}
       <h5>Ingredients:</h5>
       {this.props.reduxState.ingredientReducer.map(ingredient => {
        return <div className="ingredients" key={ingredient.id}>
        {ingredient.ingredient_name}
          <button className="addButton" onClick={(e) => this.addToList(e, ingredient)}>Add to List</button>
        <br/>
        </div>
         }
       )}
       <br/> 
      <div className='list select'>
        <select className="select" class="browser-default" value={this.state.list_id} onChange={this.handleListChange}>{this.props.reduxState.listReducer.map(list => {
            return  <option key={list.id} value={list.id}>{list.list_name}</option>      
        })}
        </select>
</div>
<br/>
<button onClick={() => this.deleteMeal(this.state.mealChange.id)}>Delete Meal</button>

      {/* <button onClick={() => this.addIngredients(this.props.match.params.id)}>Add Ingredients to List</button> */}
       {/* <form onSubmit={this.updateMeal}>
         Edit Meal
       <input defaultValue={this.state.mealChange.newName} onChange={(event) => this.handleChange(event, 'newName')} placeholder='change name'/>
       <input defaultValue={this.state.mealChange.newRecipe}  onChange={(event) => this.handleChange(event, 'newRecipe')} placeholder='change recipe'/>
       <button type='submit'>Update Meal</button>
       <br/>
       </form>   */}
      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(MealDetails);