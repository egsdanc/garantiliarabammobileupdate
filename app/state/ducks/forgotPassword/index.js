import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD/forgotPassword',
  FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED/forgotPassword',
  FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS/forgotPassword',
  DISMISS_FORGOT_PASSWORD_ERROR: 'DISMISS_FORGOT_PASSWORD_ERROR/forgotPassword',
  CONFIRM_PINCODE: 'CONFIRM_PINCODE/confirmPinCode',
  CONFIRM_PINCODE_FAILED: 'CONFIRM_PINCODE_FAILED/confirmPinCode',
  CONFIRM_PINCODE_SUCCESS: 'CONFIRM_PINCODE_SUCCESS/confirmPinCode',
  RESET_PASSWORD: 'RESET_PASSWORD/resetPassword',
  RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED/resetPassword',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS/resetPassword',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  message: '',
  messageForPinCode: '',
  messageForPassword: '',
  actionType: '',
  phone: '',
};
const forgotPassword_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.FORGOT_PASSWORD:
      return {
        ...state,
        loader: true,
      };
    case Types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loader: false,
        message: action.payload,
        actionType: action.actionType,
        phone: action.phone,
      };
    case Types.FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.CONFIRM_PINCODE:
      return {
        ...state,
        loader: true,
      };
    case Types.CONFIRM_PINCODE_SUCCESS:
      return {
        ...state,
        loader: false,
        messageForPinCode: action.payload,
        phone: action.phone
      };
    case Types.CONFIRM_PINCODE_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.RESET_PASSWORD:
      return {
        ...state,
        loader: true,
      };
    case Types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loader: false,
        messageForPassword: action.payload
      };
    case Types.RESET_PASSWORD_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_FORGOT_PASSWORD_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const forgotPassword_action = payload => ({
  type: Types.FORGOT_PASSWORD,
  payload,
});

const resetPassword_action = payload => ({
  type: Types.RESET_PASSWORD,
  payload,
});

const pinConfirm_action = payload => ({
  type: Types.CONFIRM_PINCODE,
  payload,
});

const dismissForgotPasswordError_action = () => ({
  type: Types.DISMISS_FORGOT_PASSWORD_ERROR,
});

function* forgotPassword_operation(action) {
  try {
    const response = yield api.forgotPassword(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.FORGOT_PASSWORD_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status) {
        yield put({
          type: Types.FORGOT_PASSWORD_SUCCESS,
          payload: response.message,
          actionType: response.type,
          phone: response.phone,
        });
      } else {
        yield put({
          type: Types.FORGOT_PASSWORD_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.FORGOT_PASSWORD_FAILED,
      error: error.response,
    });
  }
}

function* pinConfirm_operation(action) {
  try {
    const response = yield api.confirmPinCode(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CONFIRM_PINCODE_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status) {
        yield put({
          type: Types.CONFIRM_PINCODE_SUCCESS,
          payload: response.message,
          phone: response.phone,
        });
      } else {
        yield put({
          type: Types.CONFIRM_PINCODE_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.CONFIRM_PINCODE_FAILED,
      error: error.response,
    });
  }
}

function* resetPassword_operation(action) {
  try {
    const response = yield api.resetPasswordPublic(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.RESET_PASSWORD_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status) {
        yield put({
          type: Types.RESET_PASSWORD_SUCCESS,
          payload: response.message,
        });
      } else {
        yield put({
          type: Types.RESET_PASSWORD_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.RESET_PASSWORD_FAILED,
      error: error.response,
    });
  }
}

function* watch_forgotPassword() {
  yield takeLatest(Types.FORGOT_PASSWORD, forgotPassword_operation);
}

function* watch_confirmPinCode() {
  yield takeLatest(Types.CONFIRM_PINCODE, pinConfirm_operation);
}

function* watch_resetPassword() {
  yield takeLatest(Types.RESET_PASSWORD, resetPassword_operation);
}

export default forgotPassword_reducer;
export {
  Types,
  forgotPassword_action,
  pinConfirm_action,
  resetPassword_action,
  dismissForgotPasswordError_action,
  watch_forgotPassword,
  watch_confirmPinCode,
  watch_resetPassword,
};
