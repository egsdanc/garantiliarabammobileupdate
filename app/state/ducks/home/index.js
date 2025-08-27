import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_HOME_DATA: 'GET_HOME_DATA/home',
  GET_HOME_DATA_FAILED: 'GET_HOME_DATA_FAILED/home',
  GET_HOME_DATA_SUCCESS: 'GET_HOME_DATA_SUCCESS/home',
  DISMISS_GET_HOME_DATA_ERROR: 'DISMISS_GET_HOME_DATA_ERROR/home',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  showcase: [],
  expertise: [],
  correct: [],
  trusted: [],
  sold: [],
  slider: [],
};
const home_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_HOME_DATA:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_HOME_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        ...action.payload,
      };
    case Types.GET_HOME_DATA_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_GET_HOME_DATA_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const getHomeData_action = payload => ({
  type: Types.GET_HOME_DATA,
  payload,
});
const dismissGetHomeDataError_action = () => ({
  type: Types.DISMISS_GET_HOME_DATA_ERROR,
});

function* home_operation() {
  try {
    const response = yield api.getHomeData();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_HOME_DATA_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status === 'success' && response?.result) {
        const {data} = response;
        yield put({
          type: Types.GET_HOME_DATA_SUCCESS,
          payload: response.datas,
        });
      } else {
        const {data} = response;
        yield put({
          type: Types.GET_HOME_DATA_FAILED,
          error: data.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_HOME_DATA_FAILED,
      error: error.response,
    });
  }
}
function* watch_getHomeData() {
  yield takeLatest(Types.GET_HOME_DATA, home_operation);
}

export default home_reducer;
export {
  Types,
  getHomeData_action,
  dismissGetHomeDataError_action,
  watch_getHomeData,
};
