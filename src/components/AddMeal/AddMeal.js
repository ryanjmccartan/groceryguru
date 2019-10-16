import React, {Component} from 'react';


class AddMeal extends Component {
  render() {
    return(
      <div>
    <p>
      Add meal

      <input placeholder="name of meal"/>
      <input placeholder="ingredients"/>
      <input placeholder="recipe"/>

    </p>
  </div>
    )
  }
}



export default AddMeal;