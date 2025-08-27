import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  SELECT_CATEGORY: 'SELECT_CATEGORY/selectCategory',
  SELECT_CATEGORY_FAILED: 'SELECT_CATEGORY_FAILED/selectCategory',
  SELECT_CATEGORY_SUCCESS: 'SELECT_CATEGORY_SUCCESS/selectCategory',
};

const INITIAL_STATE = {
  loading: false,
  error: '',
  data: [],
};
const selectCategory_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.SELECT_CATEGORY:
      return {
        ...state,
        loading: true,
        data: [],
      };
    case Types.SELECT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case Types.SELECT_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const selectCategory_action = payload => ({
  type: Types.SELECT_CATEGORY,
  payload,
});

function* selectCategory_operation({payload: {ids, reject}}) {
  try {
    const response = yield api.selectCategory({ids: ids});
    if (response.datas) {
      yield put({
        type: Types.SELECT_CATEGORY_SUCCESS,
        data: response.datas,
      });
    } else if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SELECT_CATEGORY_FAILED,
        error: response.error,
      });
      yield reject(response.error);
    } else {
      yield put({
        type: Types.SELECT_CATEGORY_FAILED,
        error: {msg: 'Hata Kodu: 01'},
      });
      yield reject({msg: 'Hata Kodu: 01'});
    }
  } catch (error) {
    yield put({
      type: Types.SELECT_CATEGORY_FAILED,
      error: error.response?.data || {msg: 'Hata Kodu: 02'},
    });
    yield reject(error.response?.data || {msg: 'Hata Kodu: 02'});
  }
}
function* watch_selectCategory() {
  yield takeLatest(Types.SELECT_CATEGORY, selectCategory_operation);
}

export default selectCategory_reducer;
export {Types, selectCategory_action, watch_selectCategory};
