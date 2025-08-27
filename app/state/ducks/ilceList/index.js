import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';

export const Types = {
  ILCE_LIST_OPTIONS_BEGIN: 'ILCE_LIST_OPTIONS_BEGIN',
  ILCE_LIST_OPTIONS_SUCCESS: 'ILCE_LIST_OPTIONS_SUCCESS',
  ILCE_LIST_OPTIONS_FAILURE: 'ILCE_LIST_OPTIONS_FAILURE',
  ILCE_LIST_OPTIONS_DISMISS_ERROR: 'ILCE_LIST_OPTIONS_DISMISS_ERROR',
};
const dismissError = () => ({
  type: Types.ILCE_LIST_OPTIONS_DISMISS_ERROR,
});

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.ILCE_LIST_OPTIONS_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.ILCE_LIST_OPTIONS_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };

    case Types.ILCE_LIST_OPTIONS_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.ILCE_LIST_OPTIONS_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
const getIlceList_action = payload => ({
  type: Types.ILCE_LIST_OPTIONS_BEGIN,
  payload,
});

export const useIlceListOptions = () => {
  const dispatch = useDispatch();
  const {error, loading, data} = useSelector(state => state.IlceListOptions);
  /** action */
  const getIlceListOptionsBound = useCallback(
    p => dispatch(getIlceList_action(p)),
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
    ilceListOptions: data,
    getIlceListOptions: getIlceListOptionsBound,
  };
};

export function* getIlceListOptions_operation(action) {
  try {
    const response = yield api.getIlceListOptions(action.payload);
    if (response.result) {
      yield put({
        type: Types.ILCE_LIST_OPTIONS_SUCCESS,
        payload: response.datas || [],
      });
    }
  } catch (error) {
    yield put({
      type: Types.ILCE_LIST_OPTIONS_FAILURE,
      error,
    });
  }
}
export function* watch_getIlceListOptions() {
  yield takeLatest(Types.ILCE_LIST_OPTIONS_BEGIN, getIlceListOptions_operation);
}
