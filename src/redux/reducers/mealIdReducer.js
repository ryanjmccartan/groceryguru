function mealReducer (state=[], action){
    switch(action.type){
        case 'SET_MEAL_ID':
           state.push(action.payload)
            return state
        default:
            return state
    }
}

export default mealReducer