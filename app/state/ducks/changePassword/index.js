import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  CHANGE_PASSWORD: 'CHANGE_PASSWORD/changePassword',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED/changePassword',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS/changePassword',
  DISMISS_CHANGE_PASSWORD_ERROR: 'DISMISS_CHANGE_PASSWORD_ERROR/changePassword',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  message: '',
};
const changePassword_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.CHANGE_PASSWORD:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loader: false,
        message: action.payload,
      };
    case Types.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_CHANGE_PASSWORD_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const changePassword_action = payload => ({
  type: Types.CHANGE_PASSWORD,
  payload,
});

const dismissChangePasswordError_action = () => ({
  type: Types.DISMISS_CHANGE_PASSWORD_ERROR,
});

function* changePassword_operation(action) {
  try {
    const response = yield api.changePassword(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CHANGE_PASSWORD_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status) {
        yield put({
          type: Types.CHANGE_PASSWORD_SUCCESS,
          payload: response.message,
        });
      } else {
        yield put({
          type: Types.CHANGE_PASSWORD_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.CHANGE_PASSWORD_FAILED,
      error: error.response,
    });
  }
}
function* watch_changePassword() {
  yield takeLatest(Types.CHANGE_PASSWORD, changePassword_operation);
}

export default changePassword_reducer;
export {
  Types,
  changePassword_action,
  dismissChangePasswordError_action,
  watch_changePassword,
};
