// Reducer stores single list
const singleListReducer = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case 'SET_SINGLE_LIST':
            return action.payload
        default: 
            return state
    }
};

export default singleListReducer;