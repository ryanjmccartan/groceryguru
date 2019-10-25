import React, {Component} from 'react';
import {connect} from 'react-redux';


class GroceryList extends Component {

componentDidMount() {
// this.props.dispatch({type:'GET_INGREDIENT'})
this.props.dispatch({type:'GET_LIST'});
}

state = {
  listName: ''
}

// state = {
//   ingredients: [
//     name:
//   ] this.props.dispatch({type:'GET_INGREDIENT'})
// }

handleChange = (event, param) => {
  this.setState({
    [param]: event.target.value
  })
}

submitList = () => {
  console.group('looing for listname', this.state.listName);
  this.props.dispatch({type: 'POST_LIST', payload: this.state});
}

viewList = (list) => {
  this.props.history.push('/home/' + list)
}

  render() {
    return(
      <div>
    {this.props.reduxState.listReducer.map(list => {
      return <ul key={list.id}>
        <li onClick={() => this.viewList(list.id)}>{list.list_name}</li>
        </ul>
    })}
    <input onChange={(event) => this.handleChange(event, 'listName')}/>
    <button onClick={this.submitList}>Create List</button>
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(GroceryList);
