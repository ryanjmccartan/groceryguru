import {put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

function* postList(action) {
    console.log(action.payload);
    try{
        yield axios.post('/meal/list', action.payload);
        yield getList();
    }catch (error) {
        console.log('error with posting list', error)
    }
}

// GET specific list
function* getListByID(action){
    try{
        const response = yield axios.get('/meal/list/' + action.payload);
        yield put({type: 'SET_SINGLE_LIST', payload: response.data});
        console.log('getList', response.data);
    }catch (error) {
        console.log('error with getting list', error);
    }
}

function* getList(){
    try{
        const response = yield axios.get('/meal/list');
        yield put({type: 'SET_LIST', payload: response.data});
        console.log('getList', response.data);
    }catch (error) {
        console.log('error with getting list', error);
    }
}

function* deleteList(action) {
    try{
        yield axios.delete(`/meal/list/${action.payload}`);
        yield getList();
    }catch(error) {
        console.log('error with deleting list', error);
    }
}

function* listSaga() {
    yield takeEvery('POST_LIST', postList)
    yield takeEvery('GET_LIST', getList)
    yield takeEvery('GET_LIST_BY_ID', getListByID)
    yield takeEvery('DELETE_LIST', deleteList)
}

export default listSaga;