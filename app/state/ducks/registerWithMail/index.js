import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  USER_REGITER_WITH_MAIL: 'USER_REGITER_WITH_MAIL/registerWithMail',
  USER_REGITER_WITH_MAIL_RESET:
    'USER_REGITER_WITH_MAIL_RESET/registerWithMailReset',
  USER_REGITER_WITH_MAIL_FAILED:
    'USER_REGITER_WITH_MAIL_FAILED/registerWithMail',
  USER_REGITER_WITH_MAIL_SUCCESS:
    'USER_REGITER_WITH_MAIL_SUCCESS/registerWithMail',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const registerWithMail_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.USER_REGITER_WITH_MAIL:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case Types.USER_REGITER_WITH_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.USER_REGITER_WITH_MAIL_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error.data,
      };
    case Types.USER_REGITER_WITH_MAIL_RESET:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};

const registerWithMail_action = (payload, resolve, reject) => ({
  type: Types.USER_REGITER_WITH_MAIL,
  payload,
  resolve,
  reject,
});
const registerWithMail_action_reset = () => ({
  type: Types.USER_REGITER_WITH_MAIL_RESET,
});

function* registerWithMail_operation(action) {
  try {
    const response = yield api.registerWithMail(action.payload);
    if (response?.status === true) {
      yield put({
        type: Types.USER_REGITER_WITH_MAIL_SUCCESS,
        data: response.results,
      });
      yield action.resolve(response);
    } else {
      yield put({
        type: Types.USER_REGITER_WITH_MAIL_FAILED,
        error: { ...response, data: { glob: [response.message] } },
      });
      yield action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.USER_REGITER_WITH_MAIL_FAILED,
      error: { ...error, data: error.response },
    });
    yield action.reject(error);
  }
}
function* watch_registerWithMail() {
  yield takeLatest(Types.USER_REGITER_WITH_MAIL, registerWithMail_operation);
}

export default registerWithMail_reducer;
export {
  Types,
  registerWithMail_action,
  watch_registerWithMail,
  registerWithMail_action_reset,
};
