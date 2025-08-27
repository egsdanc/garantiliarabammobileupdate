import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_EXPERTISE_QUERY: 'GET_EXPERTISE_QUERY/expertiseQuery',
  GET_EXPERTISE_QUERY_FAILED: 'GET_EXPERTISE_QUERY_FAILED/expertiseQuery',
  GET_EXPERTISE_QUERY_SUCCESS: 'GET_EXPERTISE_QUERY_SUCCESS/expertiseQuery',

  GET_PROFILE_ADS_QUERY: 'GET_EXPERTISE_QUERY/getProfileAds',
  GET_PROFILE_ADS_QUERY_FAILED: 'GET_EXPERTISE_QUERY_FAILED/getProfileAds',
  GET_PROFILE_ADS_QUERY_SUCCESS: 'GET_EXPERTISE_QUERY_SUCCESS/getProfileAds',

};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: {},
};
const expertiseQuery_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_EXPERTISE_QUERY:
      return {
        ...state,
        loader: true,
        data: {},
      };
    case Types.GET_EXPERTISE_QUERY_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.GET_EXPERTISE_QUERY_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.GET_PROFILE_ADS_QUERY:
      return {
        ...state,
        loader: true,
        data: {},
      };
    case Types.GET_PROFILE_ADS_QUERY_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.GET_PROFILE_ADS_QUERY_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const getExpertiseQuery_action = (payload, resolve, reject) => ({
  type: Types.GET_EXPERTISE_QUERY,
  payload,
  resolve,
  reject,
});

const getProfileAds_action = (payload, resolve, reject) => ({
  type: Types.GET_PROFILE_ADS_QUERY,
  payload,
  resolve,
  reject,
});

function* getExpertiseQuery_operation(action) {
  try {
    const response = yield api.getExpertiseResult(action.payload);
    if (response?.result) {
      yield put({
        type: Types.GET_EXPERTISE_QUERY_SUCCESS,
        data: response?.data || {},
      });
      action.resolve(response || {});
    } else {
      yield put({
        type: Types.GET_EXPERTISE_QUERY_FAILED,
        error: response?.message,
      });
      action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.GET_EXPERTISE_QUERY_FAILED,
      error,
    });
    action.reject(error);
  }
}
function* getProfileAds_operation(action) {
  try {
    const response = yield api.getProfileAds(action.payload);
    if (response?.result) {
      yield put({
        type: Types.GET_PROFILE_ADS_QUERY_SUCCESS,
        data: response?.data || {},
      });
      action.resolve(response || {});
    } else {
      yield put({
        type: Types.GET_PROFILE_ADS_QUERY_FAILED,
        error: response?.message,
      });
      action.reject(response);
    }
  } catch (error) {
    yield put({
      type: Types.GET_PROFILE_ADS_QUERY_FAILED,
      error,
    });
    action.reject(error);
  }
}
function* watch_getExpertiseQuery() {
  yield takeLatest(Types.GET_EXPERTISE_QUERY, getExpertiseQuery_operation);
}
function* watch_getProfileAds() {
  yield takeLatest(Types.GET_PROFILE_ADS_QUERY, getProfileAds_operation);
}

export default expertiseQuery_reducer;
export {Types, getExpertiseQuery_action, getProfileAds_action,  watch_getExpertiseQuery, watch_getProfileAds};
