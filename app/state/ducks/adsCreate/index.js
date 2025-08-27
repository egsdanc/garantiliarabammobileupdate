import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  ADS_CREATE: 'ADS_CREATE/adsCreate',
  ADS_CREATE_FAILED: 'ADS_CREATE_FAILED/adsCreate',
  ADS_CREATE_SUCCESS: 'ADS_CREATE_SUCCESS/adsCreate',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const adsCreate_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.ADS_CREATE:
      return {
        ...state,
        loading: true,
      };
    case Types.ADS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.ADS_CREATE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const adsCreate_action = payload => ({
  type: Types.ADS_CREATE,
  payload,
});

function* adsCreate_operation(action) {
  try {
    const response = yield api.adsCreate(action.payload);
    if (response.data) {
      yield put({
        type: Types.ADS_CREATE_SUCCESS,
        data: response.data,
      });
    } else if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.ADS_CREATE_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.ADS_CREATE_FAILED,
        data: {msg: 'Hata Kodu : 01'},
      });
    }
  } catch (error) {
    yield put({
      type: Types.ADS_CREATE_FAILED,
      error: error.response?.data || {msg: 'Hata Kodu: 02'},
    });
  }
}
function* watch_adsCreate() {
  yield takeLatest(Types.ADS_CREATE, adsCreate_operation);
}

export default adsCreate_reducer;
export {Types, adsCreate_action, watch_adsCreate};
