import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewList extends Component {



  componentDidMount() {
    this.props.dispatch({type: 'GET_LIST_BY_ID', payload: this.props.match.params.id})
}  


  render() {
    return(
        <div>
           {this.props.reduxState.singleListReducer.map(list => {
               return <div key={list.id}>
                   {list.list_name}
                   </div>
           })}
        </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(ViewList);