// Reducer stores single meal
const singleMealReducer = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case 'SINGLE_MEAL':
            return action.payload
        default: 
            return state
    }
};

export default singleMealReducer;