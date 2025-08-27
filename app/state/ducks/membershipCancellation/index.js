import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  MEMBERSHIP_CANCELLATION: 'MEMBERSHIP_CANCELLATION/membershipCancellation',
  MEMBERSHIP_CANCELLATION_FAILED:
    'MEMBERSHIP_CANCELLATION_FAILED/membershipCancellation',
  MEMBERSHIP_CANCELLATION_SUCCESS:
    'MEMBERSHIP_CANCELLATION_SUCCESS/membershipCancellation',
  DISMISS_MEMBERSHIP_CANCELLATION_ERROR:
    'DISMISS_MEMBERSHIP_CANCELLATION_ERROR/membershipCancellation',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
};
const membershipCancellation_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.MEMBERSHIP_CANCELLATION:
      return {
        ...state,
        loader: true,
      };
    case Types.MEMBERSHIP_CANCELLATION_SUCCESS:
      return {
        ...state,
        loader: false,
      };
    case Types.MEMBERSHIP_CANCELLATION_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_MEMBERSHIP_CANCELLATION_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};

const membershipCancellation_action = (payload, resolve, reject) => ({
  type: Types.MEMBERSHIP_CANCELLATION,
  payload,
  resolve,
  reject,
});

const dismissMembershipCancellationError_action = () => ({
  type: Types.DISMISS_MEMBERSHIP_CANCELLATION_ERROR,
});

function* membershipCancellation_operation(action) {
  try {
    const response = yield api.membershipCancellation(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.MEMBERSHIP_CANCELLATION_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.MEMBERSHIP_CANCELLATION_SUCCESS,
          payload: response.data,
        });
        action.resolve(response);
      } else {
        yield put({
          type: Types.MEMBERSHIP_CANCELLATION_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.MEMBERSHIP_CANCELLATION_FAILED,
      error: error.response,
    });
  }
}

function* watch_membershipCancellation() {
  yield takeLatest(
    Types.MEMBERSHIP_CANCELLATION,
    membershipCancellation_operation,
  );
}

export default membershipCancellation_reducer;
export {
  Types,
  membershipCancellation_action,
  dismissMembershipCancellationError_action,
  watch_membershipCancellation,
};
