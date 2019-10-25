// Reducer will store ingredients
const ingredientReducer = (state = [], action) => {
    console.log(action);
    switch(action.type){
        case 'SET_INGREDIENT':
            return action.payload
        case 'SET_LIST_INGREDIENTS':
            return action.payload
        default:
            return state
    }
}

export default ingredientReducer;