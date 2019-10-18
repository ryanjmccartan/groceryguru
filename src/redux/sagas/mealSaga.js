import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';


function* postMeal(action){
    try{
        yield axios.post('/addmeal', action.payload);
    }catch(error){
        console.log('error with post', error);
    }
}

function* mealSaga() {
    yield takeEvery('POST_MEAL', postMeal)
}

export default mealSaga;