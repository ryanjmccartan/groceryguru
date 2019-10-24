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
        this.setIngredients();
    }

    // componentDidUpdate(preProps) {
    //     if(this.props.reduxState.ingredientReducer != preProps.reduxState.ingredientReducer){
    //         this.setEventToEdit();
    //     }
    // }

    setIngredients = () => {
        this.props.reduxState.ingredientReducer.forEach(ingredient => {
            this.setState({
                list: {
                ingredients: [...this.state.list.ingredients, ingredient.ingredient_name]
                }
            })
        })
        console.log('this is ingredient state', this.state.list.ingredients)
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

render() {
    return(
        <div>
        <p>Add List</p>
        {JSON.stringify(this.props.reduxState.ingredientReducer)};
        <form>
            <input onChange={(event) => this.handleChange(event, 'listName')} placeholder='list name'/>
            <input value={this.state.list.ingredients}/>

        </form>
        </div>
    )
    
  }
}

const putReduxOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxOnProps)(AddList);