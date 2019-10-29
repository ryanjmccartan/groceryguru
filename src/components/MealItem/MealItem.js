import React, {Component} from 'react';
import {connect} from 'react-redux';
import './MealItem.css';

class MealItem extends Component {


// editMeal = (id) => {
//     this.props.dispatch({type: 'EDIT_MEAL', payload: id})
//     console.log('in editMeal');
//     this.props.history.push('/' + id)
// }   

    render() {
        return(
            <div className="mealList">
            <img className="mealImage" onClick={() => this.props.mealDetails(this.props.meal.id)} src={this.props.meal.image}/>
            {/* <button onClick={() => this.editMeal(this.props.meal.id)}>Edit Meal</button> */}
        </div>
        )}
}

const putReduxOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxOnProps)(MealItem);