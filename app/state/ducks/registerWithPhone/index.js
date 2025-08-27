import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  USER_REGITER: 'USER_REGITER/registerWithPhone',
  USER_REGITER_RESET: 'USER_REGITER_RESET/registerWithPhoneReset',
  USER_REGITER_FAILED: 'USER_REGITER_FAILED/registerWithPhone',
  USER_REGITER_SUCCESS: 'USER_REGITER_SUCCESS/registerWithPhone',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const registerWithPhone_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.USER_REGITER:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case Types.USER_REGITER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.USER_REGITER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.data,
      };
    case Types.USER_REGITER_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

const registerWithPhone_action = (payload, resolve, reject) => ({
  type: Types.USER_REGITER,
  payload,
  resolve,
  reject,
});
const registerWithPhone_action_reset = () => ({
  type: Types.USER_REGITER_RESET,
});

function* registerWithPhone_operation(action) {
  try {
    const response = yield api.registerWithPhone(action.payload);
    if (response?.status === true) {
      yield put({
        type: Types.USER_REGITER_SUCCESS,
        data: response,
      });
      yield action.resolve(response);
    } else {
      yield put({
        type: Types.USER_REGITER_FAILED,
        error: { ...response, data: { glob: [response.message] } },
      });
      yield action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.USER_REGITER_FAILED,
      error: { ...error, data: error.response },
    });
    yield action.reject(error);
  }
}
function* watch_registerWithPhone() {
  yield takeLatest(Types.USER_REGITER, registerWithPhone_operation);
}

export default registerWithPhone_reducer;
export {
  Types,
  registerWithPhone_action,
  watch_registerWithPhone,
  registerWithPhone_action_reset,
};
