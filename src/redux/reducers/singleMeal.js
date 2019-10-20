// Reducer stores single meal
const singleMeal = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case 'SINGLE_MEAL':
            return action.payload
        default: 
            return state
    }
};

export default singleMeal;