import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';


function* getIngredient(action) {
    try{
        const response = yield axios.get('/meal/' + action.payload);
        console.log('this is getIngredient', response.data);
        yield put({type: 'SET_INGREDIENT', payload: response.data});
    }catch (error) {
        console.log('error with getting ingredient', error);
    }
}


function* ingredientSaga() {
    yield takeEvery('GET_INGREDIENT', getIngredient)
}

export default ingredientSaga