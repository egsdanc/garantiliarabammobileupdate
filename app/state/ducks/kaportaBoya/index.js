import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_CATEGORY_LIST: 'GET_CATEGORY_LIST/kaportaBoya',
  GET_CATEGORY_LIST_FAILED: 'GET_CATEGORY_LIST_FAILED/kaportaBoya',
  GET_CATEGORY_LIST_SUCCESS: 'GET_CATEGORY_LIST_SUCCESS/kaportaBoya',
  DISMISS_KAPORTA_BOYA_ERROR: 'DISMISS_KAPORTA_BOYA_ERROR/kaportaBoya',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  list: [],
};
const kaportaBoya_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_CATEGORY_LIST:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        list: action.payload,
      };
    case Types.GET_CATEGORY_LIST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_KAPORTA_BOYA_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const getCarCategoryList_action = payload => ({
  type: Types.GET_CATEGORY_LIST,
  payload,
});
const dismissKaportaBoyaError_action = () => ({
  type: Types.DISMISS_KAPORTA_BOYA_ERROR,
});

function* getCarCategoryList_operation() {
  try {
    const response = yield api.getCarCategoryList();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_CATEGORY_LIST,
        error: response.error,
      });
    } else {
      if (response?.status === 'success' && response?.result) {
        const {data} = response;
        yield put({
          type: Types.GET_CATEGORY_LIST_SUCCESS,
          payload: response.datas,
        });
      } else {
        const {data} = response;
        yield put({
          type: Types.GET_CATEGORY_LIST_FAILED,
          error: data.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_CATEGORY_LIST_FAILED,
      error: error.response,
    });
  }
}
function* watch_getCarCategoryList() {
  yield takeLatest(Types.GET_CATEGORY_LIST, getCarCategoryList_operation);
}

export default kaportaBoya_reducer;
export {
  Types,
  getCarCategoryList_action,
  dismissKaportaBoyaError_action,
  watch_getCarCategoryList,
};
