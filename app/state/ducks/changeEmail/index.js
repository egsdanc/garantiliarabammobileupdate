import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_EMAIL: 'GET_EMAIL/changeEmail',
  GET_EMAIL_FAILED: 'GET_EMAIL_FAILED/changeEmail',
  GET_EMAIL_SUCCESS: 'GET_EMAIL_SUCCESS/changeEmail',

  CHANGE_EMAIL: 'CHANGE_EMAIL/changeEmail',
  CHANGE_EMAIL_FAILED: 'CHANGE_EMAIL_FAILED/changeEmail',
  CHANGE_EMAIL_SUCCESS: 'CHANGE_EMAIL_SUCCESS/changeEmail',
  DISMISS_CHANGE_EMAIL_ERROR: 'DISMISS_CHANGE_EMAIL_ERROR/changeEmail',
};

const INITIAL_STATE = {
  loader: false,
  getLoader: false,
  error: '',
  data: {
    email: '',
    email_verification: 0,
  },
};
const changeEmail_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_EMAIL:
      return {
        ...state,
        getLoader: true,
      };
    case Types.GET_EMAIL_SUCCESS:
      return {
        ...state,
        getLoader: false,
        data: action.payload,
      };
    case Types.GET_EMAIL_FAILED:
      return {
        ...state,
        getLoader: false,
        error: action.error,
      };

    case Types.CHANGE_EMAIL:
      return {
        ...state,
        loader: true,
      };
    case Types.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.CHANGE_EMAIL_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_CHANGE_EMAIL_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getEmail_action = (resolve, reject) => ({
  type: Types.GET_EMAIL,
  resolve,
  reject,
});

const changeEmail_action = (payload, resolve, reject) => ({
  type: Types.CHANGE_EMAIL,
  payload,
  resolve,
  reject,
});

const dismissChangeEmailError_action = () => ({
  type: Types.DISMISS_CHANGE_EMAIL_ERROR,
});

function* getEmail_operation(action) {
  try {
    const response = yield api.getEmail();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_EMAIL_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status === 'success') {
        yield put({
          type: Types.GET_EMAIL_SUCCESS,
          payload: response.data,
        });
        action.resolve(response.data);
      } else {
        yield put({
          type: Types.GET_EMAIL_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_EMAIL_FAILED,
      error: error.response,
    });
  }
}

function* changeEmail_operation(action) {
  try {
    const response = yield api.updateEmail(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CHANGE_EMAIL_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.result) {
        yield put({
          type: Types.CHANGE_EMAIL_SUCCESS,
          payload: response.message,
        });
        yield action.resolve(response.message);
      } else {
        yield put({
          type: Types.CHANGE_EMAIL_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.CHANGE_EMAIL_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}

function* watch_getEmail() {
  yield takeLatest(Types.GET_EMAIL, getEmail_operation);
}
function* watch_changeEmail() {
  yield takeLatest(Types.CHANGE_EMAIL, changeEmail_operation);
}

export default changeEmail_reducer;
export {
  Types,
  getEmail_action,
  changeEmail_action,
  dismissChangeEmailError_action,
  watch_getEmail,
  watch_changeEmail,
};
