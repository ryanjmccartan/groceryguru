import React, {Component} from 'react';
import {connect} from 'react-redux';


class Home extends Component {

state = {
  ingredient: this.props.reduxState.ingredientReducer
}


  render() {
    return(
      <div>
    <p>
      Home/GroceryList
    </p>
{/* // {JSON.stringify(this.props.reduxState.ingredientReducer)} */}
    {this.props.reduxState.ingredientReducer.map(ingredient => {
        return <li>{ingredient}</li>
    })}
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(Home);
