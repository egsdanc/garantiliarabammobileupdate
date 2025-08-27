import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_CAR_DETAIL: 'GET_CAR_DETAIL/carDetail',
  GET_CAR_DETAIL_FAILED: 'GET_CAR_DETAIL_FAILED/carDetail',
  GET_CAR_DETAIL_SUCCESS: 'GET_CAR_DETAIL_SUCCESS/carDetail',

  SET_AD_FAVORITE: 'SET_AD_FAVORITE/carDetail',
  SET_AD_FAVORITE_FAILED: 'SET_AD_FAVORITE_FAILED/carDetail',
  SET_AD_FAVORITE_SUCCESS: 'SET_AD_FAVORITE_SUCCESS/carDetail',

  DISMISS_CAR_DETAIL_ERROR: 'DISMISS_CAR_DETAIL_ERROR/carDetail',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: {},
};
const carDetail_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_CAR_DETAIL:
      return {
        ...state,
        loader: true,
        data: {},
      };
    case Types.GET_CAR_DETAIL_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.GET_CAR_DETAIL_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_CAR_DETAIL_ERROR:
      return { ...state, error: '' };

    default:
      return state;
  }
};

const getCarDetail_action = (payload, resolve, reject) => ({
  type: Types.GET_CAR_DETAIL,
  payload,
  resolve,
  reject,
});

const setAdFavorite_action = (payload, resolve, reject) => ({
  type: Types.SET_AD_FAVORITE,
  payload,
  resolve,
  reject,
});

const dismissCarDetailError_action = () => ({
  type: Types.DISMISS_CAR_DETAIL_ERROR,
});

function* getCarDetail_operation(action) {
  try {
    const response = yield api.getCarDetail(action.payload);
    if (response?.status) {
      yield put({
        type: Types.GET_CAR_DETAIL_SUCCESS,
        data: response?.datas || {},
      });
      action.resolve(response?.datas || {});
    } else {
      yield put({
        type: Types.GET_CAR_DETAIL_FAILED,
        error: response?.message,
      });
      action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.GET_CAR_DETAIL_FAILED,
      error,
    });
    action.reject(error);
  }
}
function* setAdFavorite_operation(action) {
  try {
    const response = yield api.setAdFavorite(action.payload);
    if (response?.status) {
      yield put({
        type: Types.SET_AD_FAVORITE_SUCCESS,
        data: response?.datas || {},
      });
      action.resolve(response?.result || false);
    } else {
      yield put({
        type: Types.SET_AD_FAVORITE_FAILED,
        error: response?.message,
      });
      action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.SET_AD_FAVORITE_FAILED,
      error,
    });
    action.reject(error);
  }
}
function* watch_getCarDetail() {
  yield takeLatest(Types.GET_CAR_DETAIL, getCarDetail_operation);
}

function* watch_setAdFavorite() {
  yield takeLatest(Types.SET_AD_FAVORITE, setAdFavorite_operation);
}

export default carDetail_reducer;
export {
  Types,
  getCarDetail_action,
  setAdFavorite_action,
  watch_getCarDetail,
  watch_setAdFavorite,
  dismissCarDetailError_action,
};
