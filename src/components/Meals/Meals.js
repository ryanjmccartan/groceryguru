import React, {Component} from 'react';
import {connect} from 'react-redux';
import MealItem from '../MealItem/MeaItem';


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
        <p>Meals</p>
        <br/>
        {/* {JSON.stringify(this.props.reduxState.mealReducer)} */}
        <br/>
        {this.props.reduxState.mealReducer.map((meal) => {
                  return <MealItem key={meal.id} meal={meal} mealDetails={this.mealDetails}/>
              })}
              <br/>
        <button onClick={this.addMealRoute}>Add Meal</button>

      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(Meals);