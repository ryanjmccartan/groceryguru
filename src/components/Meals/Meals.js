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



  render() {
    return(
      <div>
        <p>Meals</p>
        <br/>
        {JSON.stringify(this.props.reduxState.mealReducer)}
        <br/>
        <button onClick={this.addMealRoute}>Add Meal</button>
        {this.props.reduxState.mealReducer.map((meal, i) => {
                  return <MealItem key={i} meal={meal}/>
              })}
      </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(Meals);