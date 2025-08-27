import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { takeLatest, put } from 'redux-saga/effects';
import api from '@fetch/api';
export const Types = {
  SEARCH_ALL_BEGIN: 'SEARCH_ALL_BEGIN',
  SEARCH_ALL_SUCCESS: 'SEARCH_ALL_SUCCESS',
  SEARCH_ALL_APPEND: 'SEARCH_ALL_APPEND',
  SEARCH_ALL_FAILURE: 'SEARCH_ALL_FAILURE',
  SEARCH_ALL_DISMISS_ERROR: 'SEARCH_ALL_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.SEARCH_ALL_DISMISS_ERROR,
});

export const useSearchAll = ({ navigation, route }) => {
  const modelIds = route?.params?.modelIds || {};
  const dispatch = useDispatch();
  /** action */
  const searchAllBound = useCallback(
    (params = {}) => dispatch(searchAll({ ...params, modelIds: modelIds || {} })),
    [dispatch, modelIds],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  const { data, loading, error, pageNumber, totalCount } = useSelector(
    state => state.KategoryAramaSonuc,
  );
  return {
    dismissError: dismissErrorBound,
    searchAll: searchAllBound,
    data,
    loading,
    error,
    pageNumber,
    totalCount,
    modelIds,
  };
};

export const searchAll = (obj = {}, resolve = () => { }, reject = () => { }) => ({
  type: Types.SEARCH_ALL_BEGIN,
  payload: obj,
  resolve,
  reject,
});

const initialState = {
  data: [],
  pageNumber: 0,
  totalCount: 0,
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SEARCH_ALL_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.SEARCH_ALL_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload.data,
        pageNumber: action.payload.pageNumber,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };
    case Types.SEARCH_ALL_APPEND:
      /** The request is success */
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        pageNumber: action.payload.pageNumber,
        totalCount: action.payload.totalCount,
        loading: false,
        error: null,
      };

    case Types.SEARCH_ALL_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.error,
      };

    case Types.SEARCH_ALL_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export function* searchAll_operation(action) {
  try {
    const response = yield api.serchAll({ ...action.payload, pageSize: 20 });
    if (response?.result) {
      yield put({
        type: action.payload.pageNumber
          ? Types.SEARCH_ALL_APPEND
          : Types.SEARCH_ALL_SUCCESS,
        payload: {
          ...response.datas.pagination,
          data: response.datas.detailAdv,
        },
      });
      // yield action.payload.resolve(response.datas || []);
    } else {
      yield put({
        type: Types.SEARCH_ALL_FAILURE,
        error: 'Tüm sonuçlar listelendi',
      });
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_ALL_FAILURE,
      error,
    });
    // yield action.payload.reject(error);
  }
}

export function* watch_searchAll() {
  yield takeLatest(Types.SEARCH_ALL_BEGIN, searchAll_operation);
}
