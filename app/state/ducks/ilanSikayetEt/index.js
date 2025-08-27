import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';

const Types = {
  REPORT_CAR: 'REPORT_CAR/ilanSikayetEt',
  REPORT_CAR_FAILED: 'REPORT_CAR_FAILED/ilanSikayetEt',
  REPORT_CAR_SUCCESS: 'REPORT_CAR_SUCCESS/ilanSikayetEt',

  DISMISS_ILAN_SIKAYET_ERROR: 'DISMISS_ILAN_SIKAYET_ERROR/ilanSikayetEt',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  result: '',
};
const ilanSikayetEt_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.REPORT_CAR:
      return {
        ...state,
        loader: true,
      };
    case Types.REPORT_CAR_SUCCESS:
      return {
        ...state,
        loader: false,
        result: action.payload,
      };
    case Types.REPORT_CAR_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_ILAN_SIKAYET_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const ilanSikayetEt_action = (payload, resolve, reject) => ({
  type: Types.REPORT_CAR,
  payload,
  resolve,
  reject,
});
const dismissIlanSikayetEtError_action = () => ({
  type: Types.DISMISS_ILAN_SIKAYET_ERROR,
});

function* ilanSikayetEt_operation(action) {
  try {
    const response = yield api.reportAd(action.payload);
    if (response?.result) {
      yield put({
        type: Types.REPORT_CAR_SUCCESS,
        payload: response.status,
      });
      action.resolve(response.status);
    } else {
      yield put({
        type: Types.REPORT_CAR_FAILED,
        error: response.message,
      });
      action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.REPORT_CAR_FAILED,
      error: error.response,
    });
    action.reject(error.message);
  }
}
function* watch_ilanSikayetEt() {
  yield takeLatest(Types.REPORT_CAR, ilanSikayetEt_operation);
}

export default ilanSikayetEt_reducer;
export {
  Types,
  dismissIlanSikayetEtError_action,
  ilanSikayetEt_action,
  watch_ilanSikayetEt,
};
