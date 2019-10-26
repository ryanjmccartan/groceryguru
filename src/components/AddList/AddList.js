import React, {Component} from 'react';
import {connect} from 'react-redux'

class AddList extends Component{

    state = {
        list: {
            listName: '',
            ingredients: []
    }
}


    componentDidMount() {
        this.props.dispatch({type: 'GET_INGREDIENT', payload: this.props.match.params.id})
        this.props.dispatch({type: 'GET_LIST'});
        this.setIngredients();
    }

    componentDidUpdate(preProps) {
        if(this.props.reduxState.ingredientReducer.length !== preProps.reduxState.ingredientReducer.length){
            // this.setEventToEdit();
            this.setIngredients();
        }
    }

    setIngredients = () => {
        this.props.reduxState.ingredientReducer.forEach(ingredient => {
            // this.setState({
            //     list: {
            //         ingredients: [...this.state.list.ingredients, ingredient.ingredient_name]
            // }
            // })
            this.state.list.ingredients.push(ingredient.ingredient_name);
        })
        this.setState({state: this.state});
        console.log('this is ingredient state', this.state.list.ingredients);
    }

    handleChange = (event, input) => {
        event.preventDefault();
        if(this.state.list.listName = ''){
            alert('Please enter a list name');
        }
        this.setState({
            ...this.state.listName,
            [input]: event.target.value
        })
    }

    addIngredients = () => {
        this.props.dispatch({type:'POST_LIST', payload: this.state.listName});
    }

render() {
    return(
        <div>
        <p>Add List</p>
        {JSON.stringify(this.props.reduxState.mealIdReducer)};
        {JSON.stringify(this.props.reduxState.listReducer)};

        <select>{this.props.reduxState.listReducer.map(list => {
            return  <option key={list.id}>{list.list_name}</option>      
        })}
        </select>
        <form onSubmit={this.addIngredients}>
            <input onChange={(event) => this.handleChange(event, 'listName')} placeholder='list name'/>
            <input value={this.state.list.ingredients}/>
            {/* <select> */}
                {/* <option value = {this.props.reduxState.ingredientReducer}>ingredient</option>List</select> */}
            <br/>
            <button type='submit'>Add Ingredients</button>
        </form>
        </div>
    )
    
  }
}

const putReduxOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxOnProps)(AddList);