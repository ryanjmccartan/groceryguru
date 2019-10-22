import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// Function will POST to database
function* postMeal(action){
    try{
        yield axios.post('/meal', action.payload);
        yield getMeal();
    }catch(error){
        console.log('error with post', error);
    }
}

// Function to GET meals from database
function* getMeal() {
    try{
        const response = yield axios.get('/meal');
        console.log('this is getMeal', response.data);
        yield put({type: 'SET_MEAL', payload: response.data});
    }catch (error) {
        console.log('error with get request', error);
    }
}

// GET ingredients for specific meal


// PUT request to edit meal
function* editMeal(action) {
    try{
        console.log('in editMeal', action.payload)
        yield axios.put('/meal', action.payload)
        yield getMeal();
    }catch(error) {
        console.log('error with put request', error)
    }
}

// DELETE request to delete meal
function* deleteMeal(action) {
    try{
        console.log('in deleteMeal');
        yield axios.delete('/meal/' + action.payload)
        yield getMeal();
    }catch (error) {
        console.log('error with delete request', error)
    }
}


function* mealSaga() {
    yield takeEvery('POST_MEAL', postMeal)
    yield takeEvery('GET_MEAL', getMeal)
    yield takeEvery('EDIT_MEAL', editMeal)
    yield takeEvery('DELETE_MEAL', deleteMeal)
}

export default mealSaga;