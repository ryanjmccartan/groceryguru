import React, {Component} from 'react';
import {connect} from 'react-redux';


class Meals extends Component {

componentDidMount() {
  this.getMeal();
}

addMealRoute = () => {
  this.props.history.push('/addmeal');
}

getMeal = () => {
  this.props.dispatch({type: 'GET_MEAL'})
  console.log(this.props.reduxState);
}

  render() {
    return(
      <div>
    <p>
      Meals
      <br/>
      {JSON.stringify(this.props.reduxState.mealReducer)}
      <button onClick={this.addMealRoute}>Add Meal</button>
    </p>
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(Meals);