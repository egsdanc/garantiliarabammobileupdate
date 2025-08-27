import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {takeLatest, put} from 'redux-saga/effects';
import api from '@fetch/api';
import {equals, filter, ifElse, includes, length, pipe, uniq} from 'ramda';
export const Types = {
  COMPARE_CARS_BEGIN: 'COMPARE_CARS_BEGIN',
  COMPARE_CARS_SUCCESS: 'COMPARE_CARS_SUCCESS',
  COMPARE_CARS_APPEND: 'COMPARE_CARS_APPEND',
  COMPARE_CARS_FAILURE: 'COMPARE_CARS_FAILURE',
  COMPARE_CARS_DISMISS_ERROR: 'COMPARE_CARS_DISMISS_ERROR',
  ADD_CAR_ID: 'ADD_CAR_ID',
  REMOVE_CAR_ID: 'REMOVE_CAR_ID',
  CLEAN_CARS: 'CLEAN_CARS',
};

const addCar = (payload = '1') => ({
  type: Types.ADD_CAR_ID,
  payload,
});

const removeCar = (payload = '1') => ({
  type: Types.REMOVE_CAR_ID,
  payload,
});

const clearComparecar = (payload = '1') => ({
  type: Types.CLEAN_CARS,
  payload,
});

const dismissError = () => ({
  type: Types.COMPARE_CARS_DISMISS_ERROR,
});

export const compareCars = (
  arr = [],
  resolve = () => {},
  reject = () => {},
) => ({
  type: Types.COMPARE_CARS_BEGIN,
  payload: arr,
  resolve,
  reject,
});

export const useCompareCars = () => {
  const dispatch = useDispatch();
  const {data, loading, error, cars} = useSelector(state => state.CompareCars);
  const canCompare = pipe(
    uniq,
    length,
    equals(2),
  )(cars);
  const canAdd = !canCompare;
  const canShow = pipe(
    length,
    ifElse(equals(0), () => false, () => true),
  )(cars);
  /** action */
  const compareCarsBound = useCallback(
    () => canCompare && dispatch(compareCars(cars)),
    [dispatch, canCompare, cars],
  );
  /** action */
  const addCarBound = useCallback(
    (carid = '') => canAdd && dispatch(addCar(carid)),
    [canAdd, dispatch],
  );
  /** action */
  const removeCarBound = useCallback(
    (carId = '1') => dispatch(removeCar(carId)),
    [dispatch],
  );
  /** action */
  const clearComparecarBound = useCallback(() => dispatch(clearComparecar()), [
    dispatch,
  ]);
  /** action */
  const dismissErrorBound = useCallback(() => dispatch(dismissError()), [
    dispatch,
  ]);
  const isSelected = useCallback(value => includes(value, cars), [cars]);
  return {
    dismissError: dismissErrorBound,
    compareCars: compareCarsBound,
    addCar: addCarBound,
    removeCar: removeCarBound,
    clearComparecar: clearComparecarBound,
    data,
    loading,
    error,
    cars,
    canShow,
    canCompare,
    canAdd,
    isSelected,
  };
};

const initialState = {
  data: [],
  cars: [],
  loading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Types.COMPARE_CARS_BEGIN:
      /** Just after a request is sent */
      return {
        ...state,
        loading: true,
        error: null,
      };

    case Types.COMPARE_CARS_SUCCESS:
      /** The request is success */
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };

    case Types.COMPARE_CARS_FAILURE:
      /** The request is failed */
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload.error,
      };

    case Types.COMPARE_CARS_DISMISS_ERROR:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
      };

    case Types.ADD_CAR_ID:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
        cars: uniq([...state.cars, action.payload]),
      };
    case Types.REMOVE_CAR_ID:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
        cars: pipe(
          uniq,
          filter(i => i.id !== action.payload.id),
        )(state.cars),
      };

    case Types.CLEAN_CARS:
      /** Dismiss the request failure error */
      return {
        ...state,
        error: null,
        cars: [],
      };

    default:
      return state;
  }
};

export function* compareCars_operation(action) {
  try {
    const response = yield api.compareCars(action.payload);
    if (response?.result) {
      yield put({
        type: Types.COMPARE_CARS_SUCCESS,
        payload: {
          data: response.datas.detailAdv,
        },
      });
    }
  } catch (error) {
    yield put({
      type: Types.COMPARE_CARS_FAILURE,
      error,
    });
    // yield action.payload.reject(error);
  }
}

export function* watch_compareCars() {
  yield takeLatest(Types.COMPARE_CARS_BEGIN, compareCars_operation);
}
