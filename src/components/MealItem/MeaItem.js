import React, {Component} from 'react';
import {connect} from 'react-redux';

class MealList extends Component {

    render() {
        return(
            <div className="mealList">
            {JSON.stringify(this.props.meal.name)}
            <span>{this.props.meal.meal_name}</span>
            <span>{this.props.meal.ingredient_name}</span>
            <span>{this.props.meal.meal_name}</span>
        </div>
        )}
}

const putReduxOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxOnProps)(MealList);