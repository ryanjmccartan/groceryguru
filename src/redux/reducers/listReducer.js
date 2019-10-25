const listReducer = (state = [], action) => {
    console.log(action);
    switch (action.type){
        case 'SET_LIST':
            return action.payload
        default: 
            return state
    }
};

export default listReducer;