import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_USERS: 'GET_USERS/getUsers',
  GET_USERS_FAILED: 'GET_USERS_FAILED/getUsers',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS/getUsers',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};
const getUsers_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_USERS:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_USERS_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.GET_USERS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const getUsers_action = payload => ({
  type: Types.GET_USERS,
  payload,
});

function* getUsers_operation(action) {
  try {
    const response = yield api.getUsers();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_USERS_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.GET_USERS_SUCCESS,
        data: response.results,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_USERS_FAILED,
      error,
    });
  }
}
function* watch_getUsers() {
  yield takeLatest(Types.GET_USERS, getUsers_operation);
}

export default getUsers_reducer;
export {Types, getUsers_action, watch_getUsers};
