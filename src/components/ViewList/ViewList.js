import React, {Component} from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';

class ViewList extends Component {

state = {
    ingredients: '',
    id: this.props.match.params.id
}

    componentDidMount() {
        this.props.dispatch({type: 'GET_LIST_BY_ID', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_INGREDIENTS_BY_ID', payload: this.props.match.params.id});
    }

    handleChange = (event, params) => {
        this.setState({
            [params]: event.target.value
        })
    }

    addIngredients = () => {
        this.props.dispatch({type: 'POST_INGREDIENTS_FROM_LIST', payload: this.state});
        this.setState({
            ingredients: ''
        })
    }

    deleteList = (list) => {
        swal({
            title: "Do you want to delete this list?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.props.dispatch({type: 'DELETE_LIST', payload: list});
              swal("This list has been deleted!", {
                icon: "success",
              });
              this.props.history.push('/home');
            } else {
              swal("Your list is safe and sound!");
            }
          });
        } 

    deleteIngredient = (ingredient) => {
        swal({
            title: "Do you want to remove this ingredient from the list?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                this.props.dispatch({type: 'DELETE_INGREDIENT', payload: ingredient});
                swal("This ingredient has been removed!", {
                icon: "success",
                });
            } else {
                swal("Your ingredient is okay!");
            }
            });
        } 

  render() {
    return(
        <div>
           {this.props.reduxState.singleListReducer.map(list => {
               return <div key={list.id}>
                   <h3>{list.list_name}</h3>
                   </div>
           })}
            <input value={this.state.ingredients} onChange={(event) => this.handleChange(event, 'ingredients')} placeholder="add ingredients"/>
            <button onClick={() => this.addIngredients()}>Add Ingredients</button>
            {this.props.reduxState.ingredientReducer.map(ingredient => {
                return <ul key={ingredient.id}>
                    <li>{ingredient.ingredient_name}</li>
                    {/* <button onClick={() => this.deleteIngredient(ingredient.id)}>Remove Item</button> */}
                </ul>
            })}
            <br/>
            <br/>
            <br/>
            <button onClick={() => this.deleteList(this.state.id)}>Delete List</button>   
        </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(ViewList);