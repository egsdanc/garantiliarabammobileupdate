import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_PERSONAL_INFO: 'GET_PERSONAL_INFO/personalInfo',
  GET_PERSONAL_INFO_FAILED: 'GET_PERSONAL_INFO_FAILED/personalInfo',
  GET_PERSONAL_INFO_SUCCESS: 'GET_PERSONAL_INFO_SUCCESS/personalInfo',
  POST_PERSONAL_INFO: 'POST_PERSONAL_INFO/personalInfo',
  POST_PERSONAL_INFO_FAILED: 'POST_PERSONAL_INFO_FAILED/personalInfo',
  POST_PERSONAL_INFO_SUCCESS: 'POST_PERSONAL_INFO_SUCCESS/personalInfo',
  DISMISS_PERSONAL_INFO_ERROR: 'DISMISS_PERSONAL_INFO_ERROR/personalInfo',
};

const INITIAL_STATE = {
  loader: false,
  postLoader: false,
  error: '',
  user: {},
  options: {
    hobbies: [],
    genders: [],
    maritalStatus: [],
    education: [],
    job: [],
  },
};
const personalInfo_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_PERSONAL_INFO:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.GET_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        loader: false,
        user: action.payload.user,
        options: action.payload.options,
      };
    case Types.GET_PERSONAL_INFO_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.POST_PERSONAL_INFO:
      return {
        ...state,
        postLoader: true,
        error: '',
      };
    case Types.POST_PERSONAL_INFO_SUCCESS:
      return {
        ...state,
        postLoader: false,
      };
    case Types.POST_PERSONAL_INFO_FAILED:
      return {
        ...state,
        postLoader: false,
        error: action.error,
      };
    case Types.DISMISS_PERSONAL_INFO_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
};

const getPersonalInfo_action = (payload, resolve, reject) => ({
  type: Types.GET_PERSONAL_INFO,
  payload,
  resolve,
  reject,
});

const postPersonalInfo_action = (payload, resolve, reject) => ({
  type: Types.POST_PERSONAL_INFO,
  payload,
  resolve,
  reject,
});

const dismissPersonalInfoError_action = () => ({
  type: Types.DISMISS_PERSONAL_INFO_ERROR,
});

function* getPersonalInfo_operation(action) {
  try {
    const response = yield api.getPersonalInfo();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_PERSONAL_INFO_FAILED,
        error: response.error,
      });
      yield action.reject(response.error);
    } else {
      if (response?.result) {
        yield put({
          type: Types.GET_PERSONAL_INFO_SUCCESS,
          payload: {
            user: response?.user,
            options: {
              hobbies: Object.entries(response?.options?.hobbies).map(item => {
                return {
                  value: item[0],
                  text: item[1],
                };
              }),
              genders: Object.entries(response?.options?.genders).map(item => {
                return {
                  value: item[0],
                  label: item[1],
                };
              }),
              maritalStatus: Object.entries(
                response?.options?.maritalStatus,
              ).map(item => {
                return {
                  value: item[0],
                  label: item[1],
                };
              }),
              education: Object.entries(response?.options?.education).map(
                item => {
                  return {
                    value: item[0],
                    label: item[1],
                  };
                },
              ),
              job: Object.entries(response?.options?.job).map(item => {
                return {
                  value: item[0],
                  label: item[1],
                };
              }),
            },
          },
        });
        yield action.resolve(response);
      } else {
        yield put({
          type: Types.GET_PERSONAL_INFO_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_PERSONAL_INFO_FAILED,
      error: error.response,
    });
    yield action.reject(error.response);
  }
}
function* watch_getPersonalInfo() {
  yield takeLatest(Types.GET_PERSONAL_INFO, getPersonalInfo_operation);
}
function* postPersonalInfo_operation(action) {
  try {
    const response = yield api.postPersonalInfo(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.POST_PERSONAL_INFO_FAILED,
        error: response.error,
      });
      yield action.reject(response.message);
    } else {
      if (response?.result) {
        yield put({
          type: Types.POST_PERSONAL_INFO_SUCCESS,
          payload: response,
        });
        yield action.resolve(response);
      } else {
        yield put({
          type: Types.POST_PERSONAL_INFO_FAILED,
          error: response.message,
        });
        yield action.reject(response);
      }
    }
  } catch (error) {
    yield put({
      type: Types.POST_PERSONAL_INFO_FAILED,
      error: error.response,
    });
    yield action.reject(error.response);
  }
}

function* watch_postPersonalInfo() {
  yield takeLatest(Types.POST_PERSONAL_INFO, postPersonalInfo_operation);
}

export default personalInfo_reducer;
export {
  Types,
  getPersonalInfo_action,
  postPersonalInfo_action,
  dismissPersonalInfoError_action,
  watch_getPersonalInfo,
  watch_postPersonalInfo,
};
