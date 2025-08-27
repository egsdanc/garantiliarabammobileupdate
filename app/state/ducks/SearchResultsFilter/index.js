import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';

export const Types = {
  SEARCH_RESULTE_FILTER_OPTIONS_BEGIN: 'SEARCH_RESULTE_FILTER_OPTIONS_BEGIN',
  SEARCH_RESULTE_FILTER_OPTIONS_SUCCESS:
    'SEARCH_RESULTE_FILTER_OPTIONS_SUCCESS',
  SEARCH_RESULTE_FILTER_OPTIONS_FAILURE:
    'SEARCH_RESULTE_FILTER_OPTIONS_FAILURE',
  SEARCH_RESULTE_FILTER_OPTIONS_DISMISS_ERROR:
    'SEARCH_RESULTE_FILTER_OPTIONS_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.SEARCH_RESULTE_FILTER_OPTIONS_DISMISS_ERROR,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.SEARCH_RESULTE_FILTER_OPTIONS_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.SEARCH_RESULTE_FILTER_OPTIONS_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.SEARCH_RESULTE_FILTER_OPTIONS_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.SEARCH_RESULTE_FILTER_OPTIONS_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
const getSearchResultsFilter_action = payload => ({
  type: Types.SEARCH_RESULTE_FILTER_OPTIONS_BEGIN,
  payload,
});

export const useSearchResultsFilterOptions = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const modelIds = route?.params?.modelIds || {};
  const { error, loading, data } = useSelector(
    state => state.SearchResultsFilterOptions,
  );
  /** action */
  const SearchResultsFilterOptionsBound = useCallback(
    pr => dispatch(getSearchResultsFilter_action(pr)),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  /** didmount */
  useEffect(() => {
    if (modelIds) {
      SearchResultsFilterOptionsBound({ ids: modelIds });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    dismissError: dismissErrorBound,
    error,
    loading,
    dynamicFormElements: data,
    SearchResultsFilterOptions: SearchResultsFilterOptionsBound,
  };
};

export function* SearchResultsFilterOptions_operation(action) {
  try {
    const response = yield api.getSearchResultsFilterOptions(action.payload);
    if (response.result) {
      yield put({
        type: Types.SEARCH_RESULTE_FILTER_OPTIONS_SUCCESS,
        payload: response.datas || [],
      });
    }
  } catch (error) {
    yield put({
      type: Types.SEARCH_RESULTE_FILTER_OPTIONS_FAILURE,
      error,
    });
  }
}
export function* watch_SearchResultsFilterOptions() {
  yield takeLatest(
    Types.SEARCH_RESULTE_FILTER_OPTIONS_BEGIN,
    SearchResultsFilterOptions_operation,
  );
}
