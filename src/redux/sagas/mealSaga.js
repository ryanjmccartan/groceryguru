import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// Function will POST to database
function* postMeal(action){
    try{
        yield axios.post('/meal', action.payload);
    }catch(error){
        console.log('error with post', error);
    }
}

// Function to GET meals from database
function* getMeal() {
    try{
        const response = yield axios.get('/meal');
        console.log(response.data);
        yield put({type: 'SET_MEAL', payload: response.data});
    }catch (error) {
        console.log('error with get request', error);
    }
}

// Function will call the GET request

function* mealSaga() {
    yield takeEvery('POST_MEAL', postMeal)
    yield takeEvery('GET_MEAL', getMeal)
}

export default mealSaga;