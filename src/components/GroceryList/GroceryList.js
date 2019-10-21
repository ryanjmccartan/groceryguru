import React, {Component} from 'react';
import {connect} from 'react-redux';


class Home extends Component {

componentDidMount() {

}

state = {
  ingredient: this.props.match.params.id
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
