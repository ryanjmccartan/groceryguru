// Stores meals

const mealReducer = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case 'SET_MEAL':
            return action.payload
        default: 
            return state
    }
};

export default mealReducer