import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';

const Types = {
    SELECT_MODEL: 'SELECT_MODEL/selectModel',
    SELECT_MODEL_FAILED: 'SELECT_MODEL_FAILED/selectModel',
    SELECT_MODEL_SUCCESS: 'SELECT_MODEL_SUCCESS/selectModel',
};

const INITIAL_STATE = {
    loading: false,
    error: '',
    data: [],
};
const selectModel_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.SELECT_MODEL:
            return {
                ...state,
                loading: true,
            };
        case Types.SELECT_MODEL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        case Types.SELECT_MODEL_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

const selectModel_action = payload => ({
    type: Types.SELECT_MODEL,
    payload,
});

function* selectModel_operation({payload: {data, reject, resolve}}) {
    try {
        const setParams = data.hasOwnProperty('id') ? {id: data.id} : {type: data.type};
        const response = yield api.renderFiltersForAdd(setParams);
        if (response.datas) {
            yield put({
                type: Types.SELECT_MODEL_SUCCESS,
                data: response.datas,
            });
            yield resolve(response.datas);
        } else if (response.hasOwnProperty('error')) {
            yield put({
                type: Types.SELECT_MODEL_FAILED,
                error: response.error,
            });
            yield reject(response.error);
        } else {
            yield put({
                type: Types.SELECT_MODEL_SUCCESS,
                data: {msg: 'Hata Kodu : 01'},
            });
            yield reject({msg: 'Hata Kodu: 01'});
        }
    } catch (error) {
        yield put({
            type: Types.SELECT_MODEL_FAILED,
            error: error.response?.data || {msg: 'Hata Kodu: 02'},
        });
        yield reject(error.response?.data || {msg: 'Hata Kodu: 02'});
    }
}

function* watch_selectModel() {
    yield takeLatest(Types.SELECT_MODEL, selectModel_operation);
}

export default selectModel_reducer;
export {Types, selectModel_action, watch_selectModel};
