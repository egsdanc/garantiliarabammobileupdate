import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {takeLatest, put} from 'redux-saga/effects';
import api from '@fetch/api';
export const Types = {
  GET_SAVED_SEARCH_BEGIN: 'GET_SAVED_SEARCH_BEGIN',
  GET_SAVED_SEARCH_SUCCESS: 'GET_SAVED_SEARCH_SUCCESS',
  SEARCH_SAVE_BEGIN: 'SEARCH_SAVE_BEGIN',
  SEARCH_SAVE_SUCCESS: 'SEARCH_SAVE_SUCCESS',
  SEARCH_REMOVE_BEGIN: 'SEARCH_REMOVE_BEGIN',
  SEARCH_REMOVE_SUCCESS: 'SEARCH_REMOVE_SUCCESS',
  SEARCH_FAILURE: 'SEARCH_FAILURE',
  SEARCH_DISMISS_ERROR: 'SEARCH_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.SEARCH_DISMISS_ERROR,
});
/** will be used for managing */
export const useSearchManager = () => {
  const dispatch = useDispatch();
  // /** action */
  const getSavedSearchListBound = useCallback(
    () => dispatch(getSavedSearches()),
    [dispatch],
  );
  /** action */
  const saveToSearchListBound = useCallback(
    (a, b, c) =>
      dispatch(saveSearch(a, b, c)).then(() => getSavedSearchListBound()),
    [dispatch, getSavedSearchListBound],
  );
  /** action */
  const removeFromSearchListBound = useCallback(
    (id, b, c) => dispatch(removeSavedSearch(id, b, c)),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  const {data, loading, error} = useSelector(state => state.SearchManager);
  return {
    dismissError: dismissErrorBound,
    getSavedSearchList: getSavedSearchListBound,
    saveToSearchList: saveToSearchListBound,
    removeFromSearchList: removeFromSearchListBound,
    data,
    loading,
    error,
  };
};
/** used for removing Only */
export const useSearchManagerRemover = ({loading}) => {
  const dispatch = useDispatch();
  // /** action */
  const removeFromSearchListBound = useCallback(
    (id, b, c) => dispatch(removeSavedSearch(id, b, c)),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  const {loading: l, error} = useSelector(state => state.SearchManager);
  return {
    dismissError: dismissErrorBound,
    removeFromSearchList: removeFromSearchListBound,
    error,
    loading: l || loading,
  };
};
/** used for only saving */
export const useSearchManagerSaver = ({loading}) => {
  const dispatch = useDispatch();
  // /** action */
  const saveToSearchListBound = useCallback(
    (a, b, c) => dispatch(saveSearch(a, b, c)),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  const {loading: l, error} = useSelector(state => state.SearchManager);
  return {
    dismissError: dismissErrorBound,
    saveToSearchList: saveToSearchListBound,
    loading: l || loading,
    error,
  };
};

export const getSavedSearches = (
  obj = {},
  resolve = () => {},
  reject = () => {},
) => ({
  type: Types.GET_SAVED_SEARCH_BEGIN,
  payload: obj,
  resolve,
  reject,
});
export const saveSearch = (
  obj = {},
  resolve = () => {},
  reject = () => {},
) => ({
  type: Types.SEARCH_SAVE_BEGIN,
  payload: obj,
  resolve,
  reject,
});
export const removeSavedSearch = (
  id,
  resolve = () => {},
  reject = () => {},
) => ({
  type: Types.SEARCH_REMOVE_BEGIN,
  payload: id,
  resolve,
  reject,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.GET_SAVED_SEARCH_BEGIN:
      /** Just after a request is sent */
      return {
        loading: true,
        error: null,
      };
    case Types.GET_SAVED_SEARCH_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case Types.SEARCH_SAVE_BEGIN:
      /** Just after a request is sent */
      return {
        loading: true,
        error: null,
      };
    case Types.SEARCH_SAVE_SUCCESS:
      /** The request is success */
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Types.SEARCH_REMOVE_BEGIN:
      /** Just after a request is sent */
      return {
        loading: true,
        error: null,
      };
    case Types.SEARCH_REMOVE_SUCCESS:
      /** The request is success */
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Types.SEARCH_FAILURE:
      /** The request is failed */
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case Types.SEARCH_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export function* searchManagerGetSearchList_operation(action) {
  try {
    const response = yield api.getSearchList();
    if (response?.result) {
      yield put({
        type: Types.GET_SAVED_SEARCH_SUCCESS,
        payload: response.datas,
      });
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_FAILURE,
      payload: {error: error.response.data.message},
    });
  }
}
export function* watch_searchManagerGetSearchList() {
  yield takeLatest(
    Types.GET_SAVED_SEARCH_BEGIN,
    searchManagerGetSearchList_operation,
  );
}

export function* searchManagerSaveSearch_operation(action) {
  try {
    const response = yield api.saveSearch(action.payload);
    if (response?.result) {
      yield put({
        type: Types.SEARCH_SAVE_SUCCESS,
        payload: {}, //NEED TO ADD OBJECT
      });
      yield action.resolve(response || []);
    } else {
      yield put({
        type: Types.SEARCH_FAILURE,
        payload: {error: response.message},
      });
      yield action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_FAILURE,
      payload: {error: error.response.data.message},
    });
    yield action.reject(error.response.data.message);
  }
}
export function* watch_searchManagerSaveSearch() {
  yield takeLatest(Types.SEARCH_SAVE_BEGIN, searchManagerSaveSearch_operation);
}
export function* searchManagerRemoveSearch_operation(action) {
  try {
    const response = yield api.removeSearch(action.payload);
    if (response?.result) {
      yield put({
        type: Types.SEARCH_REMOVE_SUCCESS,
        payload: {},
      });
      yield put({
        type: Types.GET_SAVED_SEARCH_BEGIN,
        payload: {},
      });
      yield action.resolve(response || []);
    } else {
      yield put({
        type: Types.SEARCH_FAILURE,
        payload: {error: response.message},
      });
      yield action.reject(response.message);
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_FAILURE,
      payload: {error: error.response.data.message},
    });
    yield action.reject(error.response.data.message);
  }
}

export function* watch_searchManagerRemoveSearch() {
  yield takeLatest(
    Types.SEARCH_REMOVE_BEGIN,
    searchManagerRemoveSearch_operation,
  );
}
