import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  VERIFY_TCKN: 'VERIFY_TCKN/verifyTCKN',
  VERIFY_TCKN_FAILED: 'VERIFY_TCKN_FAILED/verifyTCKN',
  VERIFY_TCKN_SUCCESS: 'VERIFY_TCKN_SUCCESS/verifyTCKN',
  DISMISS_VERIFY_TCKN_ERROR: 'DISMISS_VERIFY_TCKN_ERROR/verifyTCKN',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  value: '0',
};
const verifyTCKN_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.VERIFY_TCKN:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.VERIFY_TCKN_SUCCESS:
      return {
        ...state,
        loader: false,
        value: action.payload,
      };
    case Types.VERIFY_TCKN_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_VERIFY_TCKN_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const verifyTCKN_action = (payload, resolve, reject) => ({
  type: Types.VERIFY_TCKN,
  payload,
  resolve,
  reject,
});

const dismissVerifyTCKNError_action = () => ({
  type: Types.DISMISS_VERIFY_TCKN_ERROR,
});

function* verifyTCKN_operation(action) {
  try {
    const response = yield api.verifyTCKN(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.VERIFY_TCKN_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.status) {
        yield put({
          type: Types.VERIFY_TCKN_SUCCESS,
          payload: response.value,
        });
        yield action.resolve(response.value);
      } else {
        yield put({
          type: Types.VERIFY_TCKN_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.VERIFY_TCKN_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}

function* watch_verifyTCKN() {
  yield takeLatest(Types.VERIFY_TCKN, verifyTCKN_operation);
}

export default verifyTCKN_reducer;
export {
  Types,
  verifyTCKN_action,
  dismissVerifyTCKNError_action,
  watch_verifyTCKN,
};
