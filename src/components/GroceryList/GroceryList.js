import React, {Component} from 'react';
import {connect} from 'react-redux';


class GroceryList extends Component {

componentDidMount() {
this.props.dispatch({type:'GET_INGREDIENT'})
}

// state = {
//   ingredients: [
//     name:
//   ] this.props.dispatch({type:'GET_INGREDIENT'})
// }


  render() {
    return(
      <div>
    <p>
      Home/GroceryList
    </p>
    {/* {this.props.reduxState.ingredientReducer.map(ingredient => {
        return <li>{ingredient}</li>
    })} */}
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(GroceryList);
