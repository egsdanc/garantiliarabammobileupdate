import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';

const Types = {
  LIKE_USER: 'LIKE_USER/favoriKullanicilar',
  LIKE_USER_FAILED: 'LIKE_USER_FAILED/favoriKullanicilar',
  LIKE_USER_SUCCESS: 'LIKE_USER_SUCCESS/favoriKullanicilar',

  DISMISS_LIKE_USER_ERROR: 'DISMISS_LIKE_USER_ERROR/favoriKullanicilar',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  result: '',
};
const likeUser_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LIKE_USER:
      return {
        ...state,
        loader: true,
      };
    case Types.LIKE_USER_SUCCESS:
      return {
        ...state,
        loader: false,
        result: action.payload,
      };
    case Types.LIKE_USER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_LIKE_USER_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const likeUser_action = (payload, resolve, reject) => ({
  type: Types.LIKE_USER,
  payload,
  resolve,
  reject,
});
const dismissLikeUserError_action = () => ({
  type: Types.DISMISS_LIKE_USER_ERROR,
});

function* likeUser_operation(action) {
  try {
    const response = yield api.likeUser(action.payload);
    if (response?.result) {
      yield put({
        type: Types.LIKE_USER_SUCCESS,
        payload: response.status,
      });
      action.resolve(response.status);
    } else {
      yield put({
        type: Types.LIKE_USER_FAILED,
        error: response.message,
      });
      action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.LIKE_USER_FAILED,
      error: error.response,
    });
    action.reject(error.message);
  }
}
function* watch_likeUser() {
  yield takeLatest(Types.LIKE_USER, likeUser_operation);
}

export default likeUser_reducer;
export {Types, dismissLikeUserError_action, likeUser_action, watch_likeUser};
