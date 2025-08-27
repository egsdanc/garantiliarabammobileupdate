import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  STORE_ILAN: 'STORE_ILAN/ilanEkle',
  STORE_ILAN_FAILED: 'STORE_ILAN_FAILED/ilanEkle',
  STORE_ILAN_SUCCESS: 'STORE_ILAN_SUCCESS/ilanEkle',
  STORE_CATEGORY: 'STORE_CATEGORY/ilanEkle',
  STORE_MODEL: 'STORE_MODEL/ilanEkle',
  STORE_IMAGES: 'STORE_IMAGES/ilanEkle',
  STORE_LOCATION: 'STORE_LOCATION/ilanEkle',
  STORE_INFO: 'STORE_INFO/ilanEkle',
  STORE_SPECIFICATION: 'STORE_SPECIFICATION/ilanEkle',
  STORE_PAKET: 'STORE_PAKET/ilanEkle',
  STORE_DETAIL: 'STORE_DETAIL/ilanEkle',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
  storeCategory: null,
  model: null,
  detail: null,
  images: null,
  location: null,
  info: null,
  specification: null,
  paket: null,
};
const ilanEkle_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.STORE_ILAN:
      return {
        ...state,
        loading: true,
      };
    case Types.STORE_CATEGORY:
      return {
        ...state,
        storeCategory: action.categories,
      };
    case Types.STORE_DETAIL:
      return {
        ...state,
        detail: action.detail,
      };
    case Types.STORE_MODEL:
      return {
        ...state,
        model: action.model,
      };
    case Types.STORE_IMAGES:
      return {
        ...state,
        images: action.images,
      };
    case Types.STORE:
      return {
        ...state,
        images: action.images,
      };
    case Types.STORE_INFO:
      return {
        ...state,
        info: action.info,
      };
    case Types.STORE_SPECIFICATION:
      return {
        ...state,
        specification: action.specification,
      };
    case Types.STORE_LOCATION:
      return {
        ...state,
        location: action.location,
      };
    case Types.STORE_PAKET:
      return {
        ...state,
        paket: action.paket,
      };
    case Types.STORE_ILAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.STORE_ILAN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const ilanEkle_action = payload => ({
  type: Types.STORE_ILAN,
  payload,
});
const setCategory_action = payload => ({
  type: Types.STORE_CATEGORY,
  categories: payload,
});
const setModel_action = payload => ({
  type: Types.STORE_MODEL,
  model: payload,
});
const setDetail_action = payload => ({
  type: Types.STORE_MODEL,
  detail: payload,
});

const setImages_action = payload => ({
  type: Types.STORE_MODEL,
  images: payload,
});
const setLocation_action = payload => ({
  type: Types.STORE_LOCATION,
  images: payload,
});
const setInfo_action = payload => ({
  type: Types.STORE_INFO,
  images: payload,
});

function* ilanEkle_operation(action) {
  try {
    const response = yield api.ilanEkle(action.payload);
    if (response.data) {
      yield put({
        type: Types.STORE_ILAN_SUCCESS,
        data: response.data,
      });
    } else if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.STORE_ILAN_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.STORE_ILAN_SUCCESS,
        data: {msg: 'Hata Kodu : 01'},
      });
    }
  } catch (error) {
    yield put({
      type: Types.STORE_ILAN_FAILED,
      error: error.response?.data || {msg: 'Hata Kodu: 02'},
    });
  }
}
function* watch_ilanEkle() {
  yield takeLatest(Types.STORE_ILAN, ilanEkle_operation);
}

export default ilanEkle_reducer;
export {
  Types,
  ilanEkle_action,
  watch_ilanEkle,
  setCategory_action,
  setModel_action,
  setDetail_action,
  setImages_action,
  setLocation_action,
  setInfo_action,
};
