import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  CHANGE_PHONE_NUMBER: 'CHANGE_PHONE_NUMBER/changePhone',
  CHANGE_PHONE_NUMBER_FAILED: 'CHANGE_PHONE_NUMBER_FAILED/changePhone',
  CHANGE_PHONE_NUMBER_SUCCESS: 'CHANGE_PHONE_NUMBER_SUCCESS/changePhone',

  CONFIRM_PHONE_NUMBER: 'CONFIRM_PHONE_NUMBER/changePhone',
  CONFIRM_PHONE_NUMBER_FAILED: 'CONFIRM_PHONE_NUMBER_FAILED/changePhone',
  CONFIRM_PHONE_NUMBER_SUCCESS: 'CONFIRM_PHONE_NUMBER_SUCCESS/changePhone',
  DISMISS_CHANGE_PHONE_NUMBER_ERROR:
    'DISMISS_CHANGE_PHONE_NUMBER_ERROR/changePhone',
};

const INITIAL_STATE = {
  loader: false,
  confirmLoader: false,
  error: '',
};
const changePhone_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.CHANGE_PHONE_NUMBER:
      return {
        ...state,
        loader: true,
      };
    case Types.CHANGE_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.CHANGE_PHONE_NUMBER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.CONFIRM_PHONE_NUMBER:
      return {
        ...state,
        confirmLoader: true,
      };
    case Types.CONFIRM_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        confirmLoader: false,
      };
    case Types.CONFIRM_PHONE_NUMBER_FAILED:
      return {
        ...state,
        confirmLoader: false,
        error: action.error,
      };
    case Types.DISMISS_CHANGE_PHONE_NUMBER_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const changePhone_action = (payload, resolve, reject) => ({
  type: Types.CHANGE_PHONE_NUMBER,
  payload,
  resolve,
  reject,
});

const confirmChangePhone_action = (payload, resolve, reject) => ({
  type: Types.CONFIRM_PHONE_NUMBER,
  payload,
  resolve,
  reject,
});

const dismissChangePhoneError_action = () => ({
  type: Types.DISMISS_CHANGE_PHONE_NUMBER_ERROR,
});

function* changePhone_operation(action) {
  try {
    const response = yield api.changePhone(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CHANGE_PHONE_NUMBER_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.result) {
        yield put({
          type: Types.CHANGE_PHONE_NUMBER_SUCCESS,
          payload: response.value,
        });
        yield action.resolve(response.message);
      } else {
        yield put({
          type: Types.CHANGE_PHONE_NUMBER_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.CHANGE_PHONE_NUMBER_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}
function* confirmChangePhone_operation(action) {
  try {
    const response = yield api.confirmChangePhone(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CONFIRM_PHONE_NUMBER_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.result) {
        yield put({
          type: Types.CONFIRM_PHONE_NUMBER_SUCCESS,
          payload: response.value,
        });
        yield action.resolve(response.message);
      } else {
        yield put({
          type: Types.CONFIRM_PHONE_NUMBER_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.CONFIRM_PHONE_NUMBER_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}

function* watch_changePhone() {
  yield takeLatest(Types.CHANGE_PHONE_NUMBER, changePhone_operation);
}
function* watch_confirmChangePhone() {
  yield takeLatest(Types.CONFIRM_PHONE_NUMBER, confirmChangePhone_operation);
}

export default changePhone_reducer;
export {
  Types,
  changePhone_action,
  confirmChangePhone_action,
  dismissChangePhoneError_action,
  watch_changePhone,
  watch_confirmChangePhone,
};
