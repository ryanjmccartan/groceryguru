// Reducer will store ingredients
const ingredientReducer = (state = [], action) => {
    console.log(action);
    switch(action.type){
        case 'SET_INGREDIENT':
            return [...state, action.payload];
        default:
            return state
    }
}

export default ingredientReducer