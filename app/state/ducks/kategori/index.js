import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_KATEGORI: 'GET_KATEGORI/kategori',
  GET_KATEGORI_FAILED: 'GET_KATEGORI_FAILED/kategori',
  GET_KATEGORI_SUCCESS: 'GET_KATEGORI_SUCCESS/kategori',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};
const kategori_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_KATEGORI:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_KATEGORI_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.GET_KATEGORI_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const kategori_action = payload => ({
  type: Types.GET_KATEGORI,
  payload,
});

function* getCategory_operation(action) {
  try {
    const response = yield api.getCategory(action.payload.id);
    if (response.result) {
      yield put({
        type: Types.GET_KATEGORI_SUCCESS,
        data: response.datas || [],
      });
      yield action.payload.resolve(response.datas || []);
    }
  } catch (error) {
    yield put({
      type: Types.GET_KATEGORI_FAILED,
      error,
    });
  }
}
function* watch_getCategory() {
  yield takeLatest(Types.GET_KATEGORI, getCategory_operation);
}

export default kategori_reducer;
export {Types, kategori_action, watch_getCategory};
