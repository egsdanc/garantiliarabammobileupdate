import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_BLOCKED_USERS: 'GET_BLOCKED_USERS/blockedUsers',
  GET_BLOCKED_USERS_FAILED: 'GET_BLOCKED_USERS_FAILED/blockedUsers',
  GET_BLOCKED_USERS_SUCCESS: 'GET_BLOCKED_USERS_SUCCESS/blockedUsers',

  UPDATE_BLOCKED_USER: 'UPDATE_BLOCKED_USER/blockedUsers',
  UPDATE_BLOCKED_USER_FAILED: 'UPDATE_BLOCKED_USER_FAILED/blockedUsers',
  UPDATE_BLOCKED_USER_SUCCESS: 'UPDATE_BLOCKED_USER_SUCCESS/blockedUsers',

  DISMISS_BLOCKED_USERS_ERROR: 'DISMISS_BLOCKED_USERS_ERROR/blockedUsers',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: {},
  list: []
};
const blockedUsers_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_BLOCKED_USERS:
      return {
        ...state,
        loader: true,
        list: [],
      };
    case Types.GET_BLOCKED_USERS_SUCCESS:
      return {
        ...state,
        loader: false,
        list: action.data,
      };
    case Types.GET_BLOCKED_USERS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.UPDATE_BLOCKED_USER:
      return {
        ...state,
        loader: true
      };
    case Types.UPDATE_BLOCKED_USER_SUCCESS:
      return {
        ...state,
        loader: false
      };
    case Types.UPDATE_BLOCKED_USER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.DISMISS_BLOCKED_USERS_ERROR:
      return { ...state, error: '' };

    default:
      return state;
  }
};

const getBlockedUsers_action = (payload) => ({
  type: Types.GET_BLOCKED_USERS,
  payload
});

const updateBlockedUser_action = (payload, resolve, reject) => ({
  type: Types.UPDATE_BLOCKED_USER,
  payload,
  resolve,
  reject,
});


const dismissBlockedUsersError_action = () => ({
  type: Types.DISMISS_BLOCKED_USERS_ERROR,
});

function* getBlockedUsers_operation() {
  try {
    const response = yield api.getBlockedUsers();
    if (response?.status) {
      yield put({
        type: Types.GET_BLOCKED_USERS_SUCCESS,
        data: response?.datas || [],
      });
    } else {
      yield put({
        type: Types.GET_BLOCKED_USERS_FAILED,
        error: response?.message,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_BLOCKED_USERS_FAILED,
      error,
    });
  }
}

function* updateBlockedUser_operation(action) {
  try {
    const response = yield api.updateBlockedUser(action.payload);
    if (response?.status) {
      yield put({
        type: Types.UPDATE_BLOCKED_USER_SUCCESS,
        data: response?.datas || {},
      });
      action.resolve(response?.datas || {});
    } else {
      yield put({
        type: Types.UPDATE_BLOCKED_USER_FAILED,
        error: response?.message,
      });
      action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.UPDATE_BLOCKED_USER_FAILED,
      error,
    });
    action.reject(error);
  }
}

function* watch_getBlockedUsers() {
  yield takeLatest(Types.GET_BLOCKED_USERS, getBlockedUsers_operation);
}

function* watch_updateBlockedUser() {
  yield takeLatest(Types.UPDATE_BLOCKED_USER, updateBlockedUser_operation);
}

export default blockedUsers_reducer;
export {
  Types,
  getBlockedUsers_action,
  watch_getBlockedUsers,
  dismissBlockedUsersError_action,
  updateBlockedUser_action,
  watch_updateBlockedUser
};
