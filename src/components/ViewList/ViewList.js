import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewList extends Component {

state = {
    ingredients: '',
    id: this.props.match.params.id
}

  componentDidMount() {
        this.props.dispatch({type: 'GET_LIST_BY_ID', payload: this.props.match.params.id});
        this.props.dispatch({type: 'GET_INGREDIENTS_BY_ID', payload: this.props.match.params.id});
    }
    
    componentDidUpdate(preProps) {
        if(this.props.reduxState.ingredientReducer.length !== preProps.reduxState.ingredientReducer.length){
            this.props.dispatch({type: 'GET_INGREDIENTS_BY_ID', payload: this.props.match.params.id});  
        }
    }

    handleChange = (event, params) => {
        this.setState({
            [params]: event.target.value
        })
    }

    addIngredients = () => {
        this.props.dispatch({type: 'POST_INGREDIENTS_FROM_LIST', payload: this.state})
    }



  render() {
    return(
        <div>
           {this.props.reduxState.singleListReducer.map(list => {
               return <div key={list.id}>
                   {list.list_name}
                   </div>
           })}
            <input onChange={(event) => this.handleChange(event, 'ingredients')} placeholder="add ingredients"/>
            <button onClick={() => this.addIngredients()}>Add Ingredients</button>
            {this.props.reduxState.ingredientReducer.map(ingredient => {
                return <ul key={ingredient.id}>
                    <li>{ingredient.ingredient_name}</li>
                </ul>
            })}
        </div>
    )
  }
}

const putReduxOnProps = (reduxState) => ({
  reduxState
})


export default connect(putReduxOnProps)(ViewList);