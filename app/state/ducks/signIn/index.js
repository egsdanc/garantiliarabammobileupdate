import { put, call, takeLatest } from 'redux-saga/effects';
import api from '../../fetch/api';
const Types = {
  SIGN_IN: 'SIGN_IN/signIn',
  SIGN_IN_FAILED: 'SIGN_IN_FAILED/signIn',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS/signIn',
  SET_TOKEN: 'SET_TOKEN/signIn',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
  user: {},
  token: '',
  status: false,
};
const signIn_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SIGN_IN:
      return {
        ...state,
        loader: true,
        status: false,
        error: '',
      };
    case Types.SIGN_IN_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
        user: action.user,
        token: action.token,
        status: action.status,
      };
    case Types.SIGN_IN_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
        showModal: true,
      };
    case Types.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

const signIn_action = payload => ({
  type: Types.SIGN_IN,
  payload,
});
const updateState = ({ payload, resolve, reject }) => ({
  type: Types.SIGN_IN,
  payload,
  resolve,
  reject,
});
const setToken = token => ({
  type: Types.SET_TOKEN,
  token,
});
/** azat yazdi */
const signIn_action_success = data => ({
  type: Types.SIGN_IN_SUCCESS,
  data: data,
  user: data.user,
  token: data.token,
  status: data.status,
});

// export const updateState = (key, value) => dispatch => {
//   dispatch({
//     type: 'UPDATE_STATE',
//     key,
//     value,
//   });
//   return Promise.resolve();
// };
function* signIn_operation(action) {
  try {
    const data = yield api.auth(action.payload);
    if (data.status === true) {
      yield put({
        type: Types.SIGN_IN_SUCCESS,
        data: data,
        user: data.user,
        token: data.token,
        status: data.status,
      });
      yield action.resolve(data);
    } else {
      yield action.reject(data);

      yield put({
        type: Types.SIGN_IN_FAILED,
        error: { message: data.message, status: false },
      });
    }
  } catch (error) {
    try {
      yield action.reject(error);

      const { response = { message: 'Beklenmedik bir hata olustu' } } = error;
      yield put({
        type: Types.SIGN_IN_FAILED,
        error: { message: response.message, status: false },
      });
    } catch (err) {
      yield put({
        type: Types.SIGN_IN_FAILED,
        error: { message: 'Beklenmedik bir hata olustu' },
      });
    }
  }
}
function* watch_signIn() {
  yield takeLatest(Types.SIGN_IN, signIn_operation);
}

export default {
  default: signIn_reducer
};
export {
  Types,
  signIn_action,
  watch_signIn,
  setToken,
  updateState,
  signIn_action_success,
};
