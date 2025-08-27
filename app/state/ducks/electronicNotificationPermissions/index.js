import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_ELECTRONIC_NOTIFICATION_PERMISSIONS:
    'GET_ELECTRONIC_NOTIFICATION_PERMISSIONS/electronicNotificationPermissions',
  GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED:
    'GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED/electronicNotificationPermissions',
  GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS:
    'GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS/electronicNotificationPermissions',

  SET_ELECTRONIC_NOTIFICATION_PERMISSIONS:
    'SET_ELECTRONIC_NOTIFICATION_PERMISSIONS/electronicNotificationPermissions',
  SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED:
    'SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED/electronicNotificationPermissions',
  SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS:
    'SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS/electronicNotificationPermissions',
  DISMISS_ELECTRONIC_NOTIFICATION_PERMISSIONS_ERROR:
    'DISMISS_ELECTRONIC_NOTIFICATION_PERMISSIONS_ERROR/electronicNotificationPermissions',
};

const INITIAL_STATE = {
  loader: false,
  getLoader: false,
  error: '',
  data: {},
};
const electronicNotificationPermissions_reducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS:
      return {
        ...state,
        loader: true,
      };
    case Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getElectronicNotificationPermissions_action = (resolve, reject) => ({
  type: Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS,
  resolve,
  reject,
});

const setElectronicNotificationPermissions_action = (
  payload,
  resolve,
  reject,
) => ({
  type: Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS,
  payload,
  resolve,
  reject,
});

const dismissElectronicNotificationPermissionsError_action = () => ({
  type: Types.DISMISS_ELECTRONIC_NOTIFICATION_PERMISSIONS_ERROR,
});

function* getElectronicNotificationPermissions_operation(action) {
  try {
    const response = yield api.getElectronicNotificationPermissions();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS,
          payload: response?.datas,
        });
        action.resolve(response?.datas);
      } else {
        yield put({
          type: Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
      error: error.response,
    });
  }
}
function* setElectronicNotificationPermissions_operation(action) {
  try {
    const response = yield api.setElectronicNotificationPermissions(
      action.payload,
    );
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_SUCCESS,
          payload: response?.datas,
        });
        action.resolve(response?.datas);
      } else {
        yield put({
          type: Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS_FAILED,
      error: error.response,
    });
  }
}

function* watch_getElectronicNotificationPermissions() {
  yield takeLatest(
    Types.GET_ELECTRONIC_NOTIFICATION_PERMISSIONS,
    getElectronicNotificationPermissions_operation,
  );
}
function* watch_setElectronicNotificationPermissions() {
  yield takeLatest(
    Types.SET_ELECTRONIC_NOTIFICATION_PERMISSIONS,
    setElectronicNotificationPermissions_operation,
  );
}

export default electronicNotificationPermissions_reducer;
export {
  Types,
  getElectronicNotificationPermissions_action,
  setElectronicNotificationPermissions_action,
  dismissElectronicNotificationPermissionsError_action,
  watch_getElectronicNotificationPermissions,
  watch_setElectronicNotificationPermissions,
};
