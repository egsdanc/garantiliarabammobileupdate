import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_TODO: 'GET_TODO/todo',
  GET_TODO_FAILED: 'GET_TODO_FAILED/todo',
  GET_TODO_SUCCESS: 'GET_TODO_SUCCESS/todo',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};
const getTodo_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_TODO:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_TODO_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.GET_TODO_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};

const getTodo_action = payload => ({
  type: Types.GET_TODO,
  payload,
});

function* getTodo_operation(action) {
  try {
    const response = yield api.getTodo(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_TODO_FAILED,
        error: response.error,
      });
    } else {
      yield put({
        type: Types.GET_TODO_SUCCESS,
        data: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: Types.GET_TODO_FAILED,
      error,
    });
  }
}
function* watch_getTodo() {
  yield takeLatest(Types.GET_TODO, getTodo_operation);
}

export default getTodo_reducer;
export {Types, getTodo_action, watch_getTodo};
