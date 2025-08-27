import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  CHECK_USER_FOR_EXPERTISE: 'CHECK_USER_FOR_EXPERTISE/ekspertizTalep',
  CHECK_USER_FOR_EXPERTISE_FAILED:
    'CHECK_USER_FOR_EXPERTISE_FAILED/ekspertizTalep',
  CHECK_USER_FOR_EXPERTISE_SUCCESS:
    'CHECK_USER_FOR_EXPERTISE_SUCCESS/ekspertizTalep',

  SEND_PAYMENT_REQUEST: 'SEND_PAYMENT_REQUEST/ekspertizTalep',
  SEND_PAYMENT_REQUEST_FAILED: 'SEND_PAYMENT_REQUEST_FAILED/ekspertizTalep',
  SEND_PAYMENT_REQUEST_SUCCESS: 'SEND_PAYMENT_REQUEST_SUCCESS/ekspertizTalep',

  DISMISS_EKSPERTIZ_TALEP_ERROR: 'DISMISS_EKSPERTIZ_TALEP_ERROR/ekspertizTalep',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  result: {},
  paymentResult: {},
};
const checkUserForExpertise_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.CHECK_USER_FOR_EXPERTISE:
      return {
        ...state,
        loader: true,
      };
    case Types.CHECK_USER_FOR_EXPERTISE_SUCCESS:
      return {
        ...state,
        loader: false,
        result: action.payload,
      };
    case Types.CHECK_USER_FOR_EXPERTISE_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.SEND_PAYMENT_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case Types.SEND_PAYMENT_REQUEST_SUCCESS:
      return {
        ...state,
        loader: false,
        paymentResult: action.payload,
      };
    case Types.SEND_PAYMENT_REQUEST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.DISMISS_EKSPERTIZ_TALEP_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const checkUserForExpertise_action = (payload, resolve, reject) => ({
  type: Types.CHECK_USER_FOR_EXPERTISE,
  payload,
  resolve,
  reject,
});

const sendPaymentRequest_action = (payload, resolve, reject) => ({
  type: Types.SEND_PAYMENT_REQUEST,
  payload,
  resolve,
  reject,
});
const dismissEkspertizTalepError_action = () => ({
  type: Types.DISMISS_EKSPERTIZ_TALEP_ERROR,
});

function* checkUserForExpertise_operation(action) {
  try {
    const response = yield api.checkUserForExpertise(action.payload);
    //STATUUS ok, ERROR show message, NEED UPDATE popup git tckn dogrulama ekrana gönder.
    if (response?.result) {
      yield put({
        type: Types.CHECK_USER_FOR_EXPERTISE_SUCCESS,
        payload: response,
      });
      action.resolve(response);
    } else {
      yield put({
        type: Types.CHECK_USER_FOR_EXPERTISE_FAILED,
        error: response.message,
      });
      action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.CHECK_USER_FOR_EXPERTISE_FAILED,
      error: error.message,
    });
    action.reject(error.message);
  }
}
function* sendPaymentRequest_operation(action) {
  try {
    const response = yield api.payForExpertise(action.payload);
    //STATUUS ok, ERROR show message, NEED UPDATE popup git tckn dogrulama ekrana gönder.
    if (response?.result) {
      yield put({
        type: Types.SEND_PAYMENT_REQUEST_SUCCESS,
        payload: response,
      });
      action.resolve(response);
    } else {
      yield put({
        type: Types.SEND_PAYMENT_REQUEST_FAILED,
        error: response.message,
      });
      action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.SEND_PAYMENT_REQUEST_FAILED,
      error: error.message,
    });
    action.reject(error.message);
  }
}
function* watch_checkUserForExpertise() {
  yield takeLatest(
    Types.CHECK_USER_FOR_EXPERTISE,
    checkUserForExpertise_operation,
  );
}
function* watch_sendPaymentRequuest() {
  yield takeLatest(Types.SEND_PAYMENT_REQUEST, sendPaymentRequest_operation);
}

export default checkUserForExpertise_reducer;
export {
  Types,
  checkUserForExpertise_action,
  sendPaymentRequest_action,
  dismissEkspertizTalepError_action,
  watch_checkUserForExpertise,
  watch_sendPaymentRequuest,
};
