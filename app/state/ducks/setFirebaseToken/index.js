import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  SET_FIREBASE_TOKEN: 'SET_FIREBASE_TOKEN/setFirebaseToken',
  SET_FIREBASE_TOKEN_FAILED: 'SET_FIREBASE_TOKEN_FAILED/setFirebaseToken',
  SET_FIREBASE_TOKEN_SUCCESS: 'SET_FIREBASE_TOKEN_SUCCESS/setFirebaseToken',

  DISMISS_SET_FIREBASE_ERROR: 'DISMISS_SET_FIREBASE_ERROR/setFirebaseToken',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
};
const setFirebaseToken_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SET_FIREBASE_TOKEN:
      return {
        ...state,
        getLoader: true,
      };
    case Types.SET_FIREBASE_TOKEN_SUCCESS:
      return {
        ...state,
        getLoader: false,
      };
    case Types.SET_FIREBASE_TOKEN_FAILED:
      return {
        ...state,
        getLoader: false,
        error: action.error,
      };
    case Types.DISMISS_SET_FIREBASE_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const setFirebaseToken_action = payload => ({
  type: Types.SET_FIREBASE_TOKEN,
  payload,
});

const dismissSetFirebaseTokenError_action = () => ({
  type: Types.DISMISS_SET_FIREBASE_ERROR,
});

function* setFirebaseToken_operation(action) {
  try {
    const response = yield api.setFirebaseToken(action.payload);
    if (response?.result) {
      yield put({
        type: Types.SET_FIREBASE_TOKEN_SUCCESS,
        payload: response.message,
      });
    } else {
      yield put({
        type: Types.SET_FIREBASE_TOKEN_FAILED,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({
      type: Types.SET_FIREBASE_TOKEN_FAILED,
      error: error.response,
    });
  }
}
function* watch_setFirebaseToken() {
  yield takeLatest(Types.SET_FIREBASE_TOKEN, setFirebaseToken_operation);
}

export default setFirebaseToken_reducer;
export {
  Types,
  setFirebaseToken_action,
  dismissSetFirebaseTokenError_action,
  watch_setFirebaseToken,
};
