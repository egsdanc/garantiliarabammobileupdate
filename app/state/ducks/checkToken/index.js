import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  CHECK_TOKEN: 'CHECK_TOKEN/checkToken',
  CHECK_TOKEN_FAILED: 'CHECK_TOKEN_FAILED/checkToken',
  CHECK_TOKEN_SUCCESS: 'CHECK_TOKEN_SUCCESS/checkToken',
  CHANGE_PHONE: 'CHANGE_PHONE/checkToken',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: [],
};
const checkToken_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.CHECK_TOKEN:
      return {
        ...state,
        loader: true,
      };
    case Types.CHECK_TOKEN_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case Types.CHECK_TOKEN_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.CHANGE_PHONE:
      return {
        ...state,
        data: {
          ...state.data,
          user: {
            ...state.data?.user,
            cellphoneNumberINT: action.payload,
          },
        },
      };

    default:
      return state;
  }
};

const checkToken_action = ({ resolve, reject }) => ({
  type: Types.CHECK_TOKEN,
  resolve,
  reject,
});
const changePhoneReducer_action = payload => ({
  type: Types.CHANGE_PHONE,
  payload,
});

function* checkToken_operation(action) {
  try {
    const response = yield api.checkToken();
    console.log("checkToken_response", response);
    if (response.status) {
      yield put({
        type: Types.CHECK_TOKEN_SUCCESS,
        data: response,
      });
      yield action.resolve(response);
    } else {
      yield action.reject(response);
      yield put({
        type: Types.CHECK_TOKEN_FAILED,
        error: response,
      });
    }
  } catch (error) {
    yield action.reject(error);
    yield put({
      type: Types.CHECK_TOKEN_FAILED,
      error,
    });
  }
}
function* watch_checkToken() {
  yield takeLatest(Types.CHECK_TOKEN, checkToken_operation);
}

export default checkToken_reducer;
export { Types, checkToken_action, changePhoneReducer_action, watch_checkToken };
