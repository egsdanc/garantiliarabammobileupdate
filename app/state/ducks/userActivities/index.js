import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_USER_ACTIVITIES: 'GET_USER_ACTIVITIES/userActivities',
  GET_USER_ACTIVITIES_FAILED: 'GET_USER_ACTIVITIES_FAILED/userActivities',
  GET_USER_ACTIVITIES_SUCCESS: 'GET_USER_ACTIVITIES_SUCCESS/userActivities',

  DISMISS_USER_ACTIVITIES_ERROR: 'DISMISS_USER_ACTIVITIES_ERROR/userActivities',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  data: {},
};
const userActivities_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_USER_ACTIVITIES:
      return {
        ...state,
        loader: true,
      };
    case Types.GET_USER_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case Types.GET_USER_ACTIVITIES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_USER_ACTIVITIES_ERROR:
      return INITIAL_STATE;

    default:
      return state;
  }
};
const getUserActivities_action = (resolve, reject) => ({
  type: Types.GET_USER_ACTIVITIES,
  resolve,
  reject,
});

const dismissUserActivitiesError_action = () => ({
  type: Types.DISMISS_USER_ACTIVITIES_ERROR,
});

function* getUserActivities_operation(action) {
  try {
    const response = yield api.getUserActivities();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_USER_ACTIVITIES_FAILED,
        error: response.error,
      });
    } else {
      if (response?.result) {
        yield put({
          type: Types.GET_USER_ACTIVITIES_SUCCESS,
          payload: response?.datas,
        });
        action.resolve(response?.datas);
      } else {
        yield put({
          type: Types.GET_USER_ACTIVITIES_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_USER_ACTIVITIES_FAILED,
      error: error.response,
    });
  }
}

function* watch_getUserActivities() {
  yield takeLatest(Types.GET_USER_ACTIVITIES, getUserActivities_operation);
}

export default userActivities_reducer;
export {
  Types,
  getUserActivities_action,
  dismissUserActivitiesError_action,
  watch_getUserActivities,
};
