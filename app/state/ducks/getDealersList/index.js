import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_DEALERS_LIST: 'GET_DEALERS_LIST/getDealersList',
  GET_DEALERS_LIST_FAILED: 'GET_DEALERS_LIST_FAILED/getDealersList',
  GET_DEALERS_LIST_SUCCESS: 'GET_DEALERS_LIST_SUCCESS/getDealersList',

  GET_PACKAGES_LIST: 'GET_PACKAGES_LIST/getDealersList',
  GET_PACKAGES_LIST_FAILED: 'GET_PACKAGES_LIST_FAILED/getDealersList',
  GET_PACKAGES_LIST_SUCCESS: 'GET_PACKAGES_LIST_SUCCESS/getDealersList',

  GET_PACKAGES_LIST_CALLBACK:
    'GET_PACKAGES_LIST_CALLBACK/getDealersListCallback',
  GET_PACKAGES_LIST_CALLBACK_FAILED:
    'GET_PACKAGES_LIST_CALLBACK_FAILED/getDealersListCallback',
  GET_PACKAGES_LIST_CALLBACK_SUCCESS:
    'GET_PACKAGES_LIST_CALLBACK_SUCCESS/getDealersListCallback',

  DISMISS_GET_DEALERS_LIST_ERROR:
    'DISMISS_GET_DEALERS_LIST_ERROR/getDealersList',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  list: [],
  packagesList: [],
};
const getDealersList_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_DEALERS_LIST:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_DEALERS_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        list: action.payload,
      };
    case Types.GET_DEALERS_LIST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.GET_PACKAGES_LIST:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_PACKAGES_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        packagesList: action.payload,
      };
    case Types.GET_PACKAGES_LIST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_GET_DEALERS_LIST_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getDealersList_action = () => ({
  type: Types.GET_DEALERS_LIST,
});

const getPackagesListCallback_action = (payload, resolve, reject) => ({
  type: Types.GET_PACKAGES_LIST_CALLBACK,
  payload,
  resolve,
  reject,
});

const getPackagesList_action = payload => ({
  type: Types.GET_PACKAGES_LIST,
  payload,
});

const dismissGetDealersListError_action = () => ({
  type: Types.DISMISS_GET_DEALERS_LIST_ERROR,
});

function* getDealersList_operation(action) {
  try {
    const response = yield api.getDealersList();
    if (response?.result) {
      yield put({
        type: Types.GET_DEALERS_LIST_SUCCESS,
        payload: response.datas,
      });
    } else {
      yield put({
        type: Types.GET_DEALERS_LIST_FAILED,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_DEALERS_LIST_FAILED,
      error: error.response,
    });
  }
}
function* getPackagesList_operation(action) {
  try {
    const response = yield api.getPackagesDealer(action.payload);
    if (response?.result) {
      yield put({
        type: Types.GET_PACKAGES_LIST_SUCCESS,
        payload: response.datas,
      });
    } else {
      yield put({
        type: Types.GET_PACKAGES_LIST_FAILED,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_PACKAGES_LIST_FAILED,
      error: error.response,
    });
  }
}
function* getPackagesListCallback_operation(action) {
  try {
    const response = yield api.getPackagesDealer(action.payload);
    if (response?.result) {
      yield put({
        type: Types.GET_PACKAGES_LIST_CALLBACK_SUCCESS,
        payload: response.datas,
      });
      action.resolve(response);
    } else {
      yield put({
        type: Types.GET_PACKAGES_LIST_CALLBACK_FAILED,
        error: response.message,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_PACKAGES_LIST_CALLBACK_FAILED,
      error: error.response,
    });
  }
}
function* watch_getDealersList() {
  yield takeLatest(Types.GET_DEALERS_LIST, getDealersList_operation);
}
function* watch_getPackagesList() {
  yield takeLatest(Types.GET_PACKAGES_LIST, getPackagesList_operation);
}
function* watch_getDealersListCallBack() {
  yield takeLatest(
    Types.GET_PACKAGES_LIST_CALLBACK,
    getPackagesListCallback_operation,
  );
}

export default getDealersList_reducer;
export {
  Types,
  getDealersList_action,
  getPackagesListCallback_action,
  getPackagesList_action,
  dismissGetDealersListError_action,
  watch_getDealersList,
  watch_getPackagesList,
  watch_getDealersListCallBack,
};
