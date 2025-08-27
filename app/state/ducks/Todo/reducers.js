import type from './types';
const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};
const Todo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.TODO:
      return {
        ...state,
        loader: true,
      };
    case type.TODO_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case type.TODO_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };

    default:
      return state;
  }
};
export default Todo;
