import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_ILLER: 'GET_ILLER/getIller',
  GET_ILLER_FAILED: 'GET_ILLER_FAILED/getIller',
  GET_ILLER_SUCCESS: 'GET_ILLER_SUCCESS/getIller',

  GET_ILCELER: 'GET_ILCELER/getIlceler',
  GET_ILCELER_FAILED: 'GET_ILCELER_FAILED/getIlceler',
  GET_ILCELER_SUCCESS: 'GET_ILCELER_SUCCESS/getIlceler',

  GET_BAYILER: 'GET_BAYILER/getBayiler',
  GET_BAYILER_FAILED: 'GET_BAYILER_FAILED/getBayiler',
  GET_BAYILER_SUCCESS: 'GET_BAYILER_SUCCESS/getBayiler',

  DISMISS_ERROR: 'DISMISS_ERROR/getIlIlceler',
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
const getIlIlceler_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_ILLER:
      return {
        ...state,
        getLoader: true,
      };
    case Types.GET_ILLER_SUCCESS:
      return {
        ...state,
        getLoader: false,
        data: action.payload,
      };
    case Types.GET_ILLER_FAILED:
      return {
        ...state,
        getLoader: false,
        error: action.error,
      };

    case Types.GET_ILCELER:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_ILCELER_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.GET_ILCELER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    case Types.GET_BAYILER:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_BAYILER_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.GET_BAYILER_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getIller_action = (resolve, reject) => ({
  type: Types.GET_ILLER,
  resolve,
  reject,
});
const getIlceler_action = (payload, resolve, reject) => ({
  type: Types.GET_ILCELER,
  payload,
  resolve,
  reject,
});
const getBayiler_action = (payload, resolve, reject) => ({
  type: Types.GET_BAYILER,
  payload,
  resolve,
  reject,
});

const dismissError_action = () => ({
  type: Types.DISMISS_ERROR,
});

function* getIller_operation(action) {
  try {
    const response = yield api.getIlListOptions();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_ILLER_FAILED,
        error: response.message,
      });
    } else {
      if (response?.result === true) {
        yield put({
          type: Types.GET_ILLER_SUCCESS,
          payload: response,
        });
        action.resolve(response);
      } else {
        yield put({
          type: Types.GET_ILLER_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_ILLER_FAILED,
      error: error.response,
    });
  }
}
function* getIlceleer_operation(action) {
  try {
    const response = yield api.updateEmail(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.CHANGE_EMAIL_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.result) {
        yield put({
          type: Types.CHANGE_EMAIL_SUCCESS,
          payload: response.message,
        });
        yield action.resolve(response.message);
      } else {
        yield put({
          type: Types.CHANGE_EMAIL_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.CHANGE_EMAIL_FAILED,
      error: error.response,
    });
    yield action.reject(error);
  }
}
function* getBayiler_operation(action) {
  try {
    const response = yield api.getDealersByCity(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_BAYILER_FAILED,
        error: response.message,
      });
    } else {
      if (response?.result === true) {
        yield put({
          type: Types.GET_BAYILER_SUCCESS,
          payload: response,
        });
        action.resolve(response);
      } else {
        yield put({
          type: Types.GET_BAYILER_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_BAYILER_FAILED,
      error: error.response,
    });
  }
}
function* watch_getIller() {
  yield takeLatest(Types.GET_ILLER, getIller_operation);
}
function* watch_getIlceler() {
  yield takeLatest(Types.GET_ILCELER, getIlceleer_operation);
}
function* watch_getBayiler() {
  yield takeLatest(Types.GET_BAYILER, getBayiler_operation);
}
export default getIlIlceler_reducer;
export {
  Types,
  getIller_action,
  getIlceler_action,
  getBayiler_action,
  dismissError_action,
  watch_getIller,
  watch_getIlceler,
  watch_getBayiler,
};
