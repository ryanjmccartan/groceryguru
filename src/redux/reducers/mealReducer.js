// Stores meals in reducer

const mealReducer = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case ('SET_MEAL'):
            return [...state, action.payload];  
        default: 
            return state
    }
};

export default mealReducer