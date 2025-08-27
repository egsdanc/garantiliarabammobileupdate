import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';

export const Types = {
  MAHALLE_LIST_OPTIONS_BEGIN: 'MAHALLE_LIST_OPTIONS_BEGIN',
  MAHALLE_LIST_OPTIONS_SUCCESS: 'MAHALLE_LIST_OPTIONS_SUCCESS',
  MAHALLE_LIST_OPTIONS_FAILURE: 'MAHALLE_LIST_OPTIONS_FAILURE',
  MAHALLE_LIST_OPTIONS_DISMISS_ERROR: 'MAHALLE_LIST_OPTIONS_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.MAHALLE_LIST_OPTIONS_DISMISS_ERROR,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.MAHALLE_LIST_OPTIONS_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.MAHALLE_LIST_OPTIONS_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.MAHALLE_LIST_OPTIONS_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.MAHALLE_LIST_OPTIONS_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
const getMahalleList_action = payload => ({
  type: Types.MAHALLE_LIST_OPTIONS_BEGIN,
  payload,
});

export const useMahalleListOptions = () => {
  const dispatch = useDispatch();
  const { error, loading, data } = useSelector(state => state.MahalleListOptions);
  /** action */
  const getMahalleListOptionsBound = useCallback(
    p => dispatch(getMahalleList_action(p)),
    [dispatch],
  );
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  return {
    dismissError: dismissErrorBound,
    error,
    loading,
    mahalleListOptions: data,
    getMahalleListOptions: getMahalleListOptionsBound,
  };
};

export function* getMahalleListOptions_operation(action) {
  try {
    const response = yield api.getMahalleListOptions(action.payload);
    if (response.result) {
      yield put({
        type: Types.MAHALLE_LIST_OPTIONS_SUCCESS,
        payload: (response.datas || []).map(item => ({ text: item?.name, value: item?.id })),
      });
    }
  } catch (error) {
    yield put({
      type: Types.MAHALLE_LIST_OPTIONS_FAILURE,
      error,
    });
  }
}
export function* watch_getMahalleListOptions() {
  yield takeLatest(Types.MAHALLE_LIST_OPTIONS_BEGIN, getMahalleListOptions_operation);
}
