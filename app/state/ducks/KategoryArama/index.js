import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { takeLatest, put } from 'redux-saga/effects';
import api from '@fetch/api';

export const Types = {
  SEARCH_CATEGORY_BEGIN: 'SEARCH_CATEGORY_BEGIN',
  SEARCH_CATEGORY_SUCCESS: 'SEARCH_CATEGORY_SUCCESS',
  SEARCH_CATEGORY_FAILURE: 'SEARCH_CATEGORY_FAILURE',
  SEARCH_CATEGORY_DISMISS_ERROR: 'SEARCH_CATEGORY_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.SEARCH_CATEGORY_DISMISS_ERROR,
});

export const useCategoryList = () => {
  const dispatch = useDispatch();
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  return {
    dismissError: dismissErrorBound,
  };
};

export const getCategoryList = (
  id = 1,
  resolve = () => { },
  reject = () => { },
) => ({
  type: Types.SEARCH_CATEGORY_BEGIN,
  payload: id,
  resolve,
  reject,
});

export const setCategoryList = (id = []) => ({
  type: Types.SEARCH_CATEGORY_SUCCESS,
  payload: id,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SEARCH_CATEGORY_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.SEARCH_CATEGORY_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.SEARCH_CATEGORY_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.SEARCH_CATEGORY_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export function* getCategoryList_operation(action) {
  try {
    const response = yield api.getCategory(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SEARCH_CATEGORY_FAILURE,
        error: response.error, //Need to check
      });
    } else {
      yield put({
        type: Types.SEARCH_CATEGORY_SUCCESS,
        payload: response.datas,
      });
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_CATEGORY_FAILURE,
      error,
    });
  }
}

export function* watch_getCategoryList() {
  yield takeLatest(Types.SEARCH_CATEGORY_BEGIN, getCategoryList_operation);
}
