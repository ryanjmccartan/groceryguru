import React, {Component} from 'react';
import {connect} from 'react-redux';
import MealItem from '../MealItem/MealItem';

class Meals extends Component {

componentDidMount() {
    this.getMeal();
}

getMeal = () => {
    this.props.dispatch({type: 'GET_MEAL'})
    console.log(this.props.reduxState);
}

addMealRoute = () => {
  this.props.history.push('/addmeal');
}

mealDetails = (id) => {
  this.props.history.push('/meals/details/' + id);
  this.props.dispatch({type: 'SINGLE_MEAL', payload: id});
}  

  render() {
    return(
      <div>
        <h4>My Meals</h4>
        <br/>
        <br/>
        <button onClick={this.addMealRoute}>Add Meal</button>

        <div className="mealItem">
        {this.props.reduxState.mealReducer.map((meal) => {
                  return <MealItem key={meal.id} meal={meal} mealDetails={this.mealDetails}/>
              })}
              </div>
              <br/>

      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(Meals);