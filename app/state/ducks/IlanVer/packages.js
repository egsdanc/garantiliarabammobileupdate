import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  PACKAGES: 'PACKAGES/packages',
  PACKAGES_FAILED: 'PACKAGES_FAILED/packages',
  PACKAGES_SUCCESS: 'PACKAGES_SUCCESS/packages',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const packages_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.PACKAGES:
      return {
        ...state,
        loading: true,
      };
    case Types.PACKAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.PACKAGES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const packages_action = payload => ({
  type: Types.PACKAGES,
  payload,
});

function* getpackages_operation(action) {
  try {
    const response = yield api.getpackages(action.payload);
    if (response.data) {
      yield put({
        type: Types.PACKAGES_SUCCESS,
        data: response.data,
      });
    } else if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.PACKAGES_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.PACKAGES_SUCCESS,
        data: {msg: 'Hata Kodu : 01'},
      });
    }
  } catch (error) {
    yield put({
      type: Types.PACKAGES_FAILED,
      error: error.response?.data || {msg: 'Hata Kodu: 02'},
    });
  }
}
function* watch_getpackages() {
  yield takeLatest(Types.PACKAGES, getpackages_operation);
}

export default packages_reducer;
export {Types, packages_action, watch_getpackages};
