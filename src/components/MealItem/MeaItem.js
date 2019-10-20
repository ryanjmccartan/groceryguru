import React, {Component} from 'react';
import {connect} from 'react-redux';

class MealList extends Component {


// editMeal = (id) => {
//     this.props.dispatch({type: 'EDIT_MEAL', payload: id})
//     console.log('in editMeal');
//     this.props.history.push('/' + id)
// }   

    render() {
        return(
            <div className="mealList">
            <button onClick={() => this.props.mealDetails(this.props.meal.meal_id)}>{this.props.meal.meal_name}</button>
            {/* <button onClick={() => this.editMeal(this.props.meal.id)}>Edit Meal</button> */}
        </div>
        )}
}

const putReduxOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxOnProps)(MealList);