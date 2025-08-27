import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_NOTIFICATION_PERMISSIONS:
    'GET_NOTIFICATION_PERMISSIONS/notificationPermissions',
  GET_NOTIFICATION_PERMISSIONS_FAILED:
    'GET_NOTIFICATION_PERMISSIONS_FAILED/notificationPermissions',
  GET_NOTIFICATION_PERMISSIONS_SUCCESS:
    'GET_NOTIFICATION_PERMISSIONS_SUCCESS/notificationPermissions',

  SET_NOTIFICATION_PERMISSIONS:
    'SET_NOTIFICATION_PERMISSIONS/notificationPermissions',
  SET_NOTIFICATION_PERMISSIONS_FAILED:
    'SET_NOTIFICATION_PERMISSIONS_FAILED/notificationPermissions',
  SET_NOTIFICATION_PERMISSIONS_SUCCESS:
    'SET_NOTIFICATION_PERMISSIONS_SUCCESS/notificationPermissions',
  DISMISS_NOTIFICATION_PERMISSIONS_ERROR:
    'DISMISS_NOTIFICATION_PERMISSIONS_ERROR/notificationPermissions',
};

const INITIAL_STATE = {
  loader: false,
  getLoader: false,
  error: '',
  data: {
    email: '',
    email_verification: 0,
  },
};
const notificationPermissions_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_NOTIFICATION_PERMISSIONS:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_NOTIFICATION_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case Types.GET_NOTIFICATION_PERMISSIONS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.SET_NOTIFICATION_PERMISSIONS:
      return {
        ...state,
        loader: true,
      };
    case Types.SET_NOTIFICATION_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.SET_NOTIFICATION_PERMISSIONS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_SET_NOTIFICATION_PERMISSIONS_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getNotificationPermissions_action = (resolve, reject) => ({
  type: Types.GET_NOTIFICATION_PERMISSIONS,
  resolve,
  reject,
});

const setNotificationPermissions_action = (payload, resolve, reject) => ({
  type: Types.SET_NOTIFICATION_PERMISSIONS,
  payload,
  resolve,
  reject,
});

const dismissNotificationPermissionsError_action = () => ({
  type: Types.DISMISS_NOTIFICATION_PERMISSIONS_ERROR,
});

function* getNotificationPermissions_operation(action) {
  try {
    const response = yield api.getNotificationPermissions();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_NOTIFICATION_PERMISSIONS_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.GET_NOTIFICATION_PERMISSIONS_SUCCESS,
          payload: response?.datas,
        });
        action.resolve(response?.datas);
      } else {
        yield put({
          type: Types.GET_NOTIFICATION_PERMISSIONS_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_NOTIFICATION_PERMISSIONS_FAILED,
      error: error.response,
    });
  }
}
function* setNotificationPermissions_operation(action) {
  try {
    const response = yield api.setNotificationPermissions(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SET_NOTIFICATION_PERMISSIONS_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.SET_NOTIFICATION_PERMISSIONS_SUCCESS,
          payload: response?.datas,
        });
        action.resolve(response?.datas);
      } else {
        yield put({
          type: Types.SET_NOTIFICATION_PERMISSIONS_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.SET_NOTIFICATION_PERMISSIONS_FAILED,
      error: error.response,
    });
  }
}

function* watch_getNotificationPermissions() {
  yield takeLatest(
    Types.GET_NOTIFICATION_PERMISSIONS,
    getNotificationPermissions_operation,
  );
}
function* watch_setNotificationPermissions() {
  yield takeLatest(
    Types.SET_NOTIFICATION_PERMISSIONS,
    setNotificationPermissions_operation,
  );
}

export default notificationPermissions_reducer;
export {
  Types,
  getNotificationPermissions_action,
  setNotificationPermissions_action,
  dismissNotificationPermissionsError_action,
  watch_getNotificationPermissions,
  watch_setNotificationPermissions,
};
