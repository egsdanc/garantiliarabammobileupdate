import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';

export const Types = {
  IL_LIST_OPTIONS_BEGIN: 'IL_LIST_OPTIONS_BEGIN',
  IL_LIST_OPTIONS_SUCCESS: 'IL_LIST_OPTIONS_SUCCESS',
  IL_LIST_OPTIONS_FAILURE: 'IL_LIST_OPTIONS_FAILURE',
  IL_LIST_OPTIONS_DISMISS_ERROR: 'IL_LIST_OPTIONS_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.IL_LIST_OPTIONS_DISMISS_ERROR,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.IL_LIST_OPTIONS_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.IL_LIST_OPTIONS_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.IL_LIST_OPTIONS_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.IL_LIST_OPTIONS_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
const getIlList_action = () => ({
  type: Types.IL_LIST_OPTIONS_BEGIN,
});

export const useIlListOptions = () => {
  const dispatch = useDispatch();
  const {error, loading, data} = useSelector(state => state.IlListOptions);
  /** action */
  const getIlListOptionsBound = useCallback(
    () => dispatch(getIlList_action()),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  /** didmount */
  useEffect(() => {
    getIlListOptionsBound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    dismissError: dismissErrorBound,
    error,
    loading,
    ilListOptions: data,
    getIlListOptions: getIlListOptionsBound,
  };
};

export function* getIlListOptions_operation(action) {
  try {
    const response = yield api.getIlListOptions();
    if (response.result) {
      yield put({
        type: Types.IL_LIST_OPTIONS_SUCCESS,
        payload: response.datas || [],
      });
    }
  } catch (error) {
    yield put({
      type: Types.IL_LIST_OPTIONS_FAILURE,
      error,
    });
  }
}
export function* watch_get_il_list_options() {
  yield takeLatest(Types.IL_LIST_OPTIONS_BEGIN, getIlListOptions_operation);
}
