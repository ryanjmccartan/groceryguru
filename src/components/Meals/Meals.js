import React, {Component} from 'react';


class Meals extends Component {

addMealRoute = () => {
  this.props.history.push('/addmeal');
}

  render() {
    return(
      <div>
    <p>
      Meals

      <button onClick={this.addMealRoute}>Add Meal</button>
    </p>
  </div>
    )
  }
}



export default Meals;