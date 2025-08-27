import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_CONFIG: 'GET_CONFIG/config',
  GET_CONFIG_FAILED: 'GET_CONFIG_FAILED/config',
  GET_CONFIG_SUCCESS: 'GET_CONFIG_SUCCESS/config',
  SET_CONFIG: 'SET_CONFIG/config',
  SET_CONFIG_FAILED: 'SET_CONFIG_FAILED/config',
  SET_CONFIG_SUCCESS: 'SET_CONFIG_SUCCESS/config',
  DISMISS_CONFIG_ERROR: 'DISMISS_CONFIG_ERROR/config',
};

const INITIAL_STATE = {
  loader: false,
  getLoader: false,
  error: '',
  value: '0',
};
const config_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_CONFIG:
      return {
        ...state,
        getLoader: true,
        error: '',
      };
    case Types.GET_CONFIG_SUCCESS:
      return {
        ...state,
        getLoader: false,
        value: action.payload,
      };
    case Types.GET_CONFIG_FAILED:
      return {
        ...state,
        getLoader: false,
        error: action.error,
      };
    case Types.SET_CONFIG:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.SET_CONFIG_SUCCESS:
      return {
        ...state,
        loader: false,
        value: action.payload,
      };
    case Types.SET_CONFIG_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_CONFIG_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const getConfig_action = (payload, resolve, reject) => ({
  type: Types.GET_CONFIG,
  payload,
  resolve,
  reject,
});

const setConfig_action = (payload, resolve, reject) => ({
  type: Types.SET_CONFIG,
  payload,
  resolve,
  reject,
});

const dismissConfigError_action = () => ({
  type: Types.DISMISS_CONFIG_ERROR,
});

function* getConfig_operation(action) {
  try {
    const response = yield api.getConfig(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_CONFIG_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.status) {
        yield put({
          type: Types.GET_CONFIG_SUCCESS,
          payload: response.value,
        });
        yield action.resolve(response.value);
      } else {
        yield put({
          type: Types.GET_CONFIG_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_CONFIG_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}

function* setConfig_operation(action) {
  try {
    const response = yield api.setConfig(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SET_CONFIG_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.status) {
        yield put({
          type: Types.SET_CONFIG_SUCCESS,
          payload: response.value,
        });
        yield action.resolve(response.value);
      } else {
        yield put({
          type: Types.SET_CONFIG_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.SET_CONFIG_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}
function* watch_getConfig() {
  yield takeLatest(Types.GET_CONFIG, getConfig_operation);
}
function* watch_setConfig() {
  yield takeLatest(Types.SET_CONFIG, setConfig_operation);
}

export default config_reducer;
export {
  Types,
  getConfig_action,
  setConfig_action,
  dismissConfigError_action,
  watch_getConfig,
  watch_setConfig,
};
