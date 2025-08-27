import { takeLatest, put } from 'redux-saga/effects';

function* fetchData() {
    try {
        yield put({ type: 'FETCH_SUCCESS', payload: { data: 'Merhaba Saga!' } });
    } catch (error) {
        yield put({ type: 'FETCH_ERROR', error });
    }
}

export default function* exampleSaga() {
    yield takeLatest('FETCH_REQUEST', fetchData);
}
