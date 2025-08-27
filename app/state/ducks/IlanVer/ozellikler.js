import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  OZELLIKLER: 'OZELLIKLER/specification',
  OZELLIKLER_FAILED: 'OZELLIKLER_FAILED/specification',
  OZELLIKLER_SUCCESS: 'OZELLIKLER_SUCCESS/specification',
};
const staticData = [
  {
    title: 'Dış donanım',
    key: 'disdonanim',
  },
  {
    title: 'Güvenlik',
    key: 'guvenlik',
  },
  {
    title: 'İç Donanım',
    key: 'icdonanim',
  },
  {
    title: 'Multimedya',
    key: 'multimedya',
  },
];
const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const specification_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.OZELLIKLER:
      return {
        ...state,
        loading: true,
      };
    case Types.OZELLIKLER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.OZELLIKLER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const specification_action = payload => ({
  type: Types.OZELLIKLER,
  payload,
});

function* specification_operation(action) {
  try {
    const response = yield api.static_specification(action.payload);
    if (response.data) {
      staticData.map(s => {
        s['data'] = response.data[s.key];
        return s;
      });
      yield put({
        type: Types.OZELLIKLER_SUCCESS,
        data: staticData,
      });
    } else if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.OZELLIKLER_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.OZELLIKLER_SUCCESS,
        data: {msg: 'Hata Kodu : 01'},
      });
    }
  } catch (error) {
    yield put({
      type: Types.OZELLIKLER_FAILED,
      error: error.response?.data || {msg: 'Hata Kodu: 02'},
    });
  }
}
function* watch_specification() {
  yield takeLatest(Types.OZELLIKLER, specification_operation);
}

export default specification_reducer;
export {Types, specification_action, watch_specification};
