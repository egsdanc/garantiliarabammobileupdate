import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  USER_VERIFY: 'USER_VERIFY/verifyPhone',
  USER_VERIFY_RESET: 'USER_VERIFY_RESET/verifyPhoneReset',
  USER_VERIFY_FAILED: 'USER_VERIFY_FAILED/verifyPhone',
  USER_VERIFY_SUCCESS: 'USER_VERIFY_SUCCESS/verifyPhone',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const verifyPhone_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.USER_VERIFY:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case Types.USER_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.USER_VERIFY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.data,
      };
    case Types.USER_VERIFY_RESET:
      return {
        ...state,
        loading: false,
        error: '',
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

const verifyPhone_action = (payload, resolve, reject) => ({
  type: Types.USER_VERIFY,
  payload,
  resolve,
  reject,
});
const verifyPhone_action_reset = () => ({
  type: Types.USER_VERIFY_RESET,
});

function* verifyPhone_operation(action) {
  try {
    const response = yield api.verifyPhone(action.payload);
    if (response.status === true) {
      yield put({
        type: Types.USER_VERIFY_SUCCESS,
        data: response.results,
      });
      yield action.resolve(response);
    } else {
      yield put({
        type: Types.USER_VERIFY_FAILED,
        error: { ...response, data: { glob: [response.message] } },
      });
      yield action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.USER_VERIFY_FAILED,
      error: { ...error, data: error.response },
    });
    yield action.reject(error);
  }
}
function* watch_verifyPhone() {
  yield takeLatest(Types.USER_VERIFY, verifyPhone_operation);
}

export default verifyPhone_reducer;
export { Types, verifyPhone_action, watch_verifyPhone, verifyPhone_action_reset };
