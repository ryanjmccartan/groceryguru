import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import './GroceryList.css';

class GroceryList extends Component {

state = {
  listName: ''
}

componentDidMount() {
  this.props.dispatch({type:'GET_LIST'});
  }


handleChange = (event, param) => {
  this.setState({
    [param]: event.target.value
  })
}

submitList = () => {
  console.group('looing for listname', this.state.listName);
  this.props.dispatch({type: 'POST_LIST', payload: this.state});
  swal({
    title: 'List added!',
    icon: 'success'
  });
  this.setState({
    listName: ''
  })
}

viewList = (list) => {
  this.props.history.push('/home/' + list)
}

  render() {
    return(
      <div className="list">
    {this.props.reduxState.listReducer.map(list => {
      return <ul key={list.id}>
        <li onClick={() => this.viewList(list.id)}>{list.list_name}</li>
        </ul>
    })}
    <input value={this.state.listName} onChange={(event) => this.handleChange(event, 'listName')} placeholder="list name"/>
    <button onClick={this.submitList}>Create List</button>
  </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})

export default connect(putReduxOnProps)(GroceryList);
