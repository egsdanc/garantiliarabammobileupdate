import { put, takeLatest } from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
  GET_CHAT_LIST: 'GET_CHAT_LIST/messages',
  GET_CHAT_LIST_FAILED: 'GET_CHAT_LIST_FAILED/messages',
  GET_CHAT_LIST_SUCCESS: 'GET_CHAT_LIST_SUCCESS/messages',
  GET_MESSAGES: 'GET_MESSAGES/messages',
  GET_MESSAGES_FAILED: 'GET_MESSAGES_FAILED/messages',
  GET_MESSAGES_SUCCESS: 'GET_MESSAGES_SUCCESS/messages',
  DELETE_MESSAGES: 'DELETE_MESSAGES/messages',
  DELETE_MESSAGES_FAILED: 'DELETE_MESSAGES_FAILED/messages',
  DELETE_MESSAGES_SUCCESS: 'DELETE_MESSAGES_SUCCESS/messages',
  SEND_MESSAGE: 'SEND_MESSAGE/messages',
  SEND_MESSAGE_FAILED: 'SEND_MESSAGE_FAILED/messages',
  SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS/messages',
  DISMISS_MESSAGES_ERROR: 'DISMISS_MESSAGES_ERROR/messages',
};

const INITIAL_STATE = {
  loader: false,
  error: '',
  list: [],
  data: {}
};
const messages_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_CHAT_LIST:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.GET_CHAT_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        list: action.payload
      };
    case Types.GET_CHAT_LIST_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.GET_MESSAGES:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload
      };
    case Types.GET_MESSAGES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DELETE_MESSAGES:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.DELETE_MESSAGES_SUCCESS:
      return {
        ...state,
        loader: false
      };
    case Types.DELETE_MESSAGES_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.SEND_MESSAGE:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case Types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loader: false
      };
    case Types.SEND_MESSAGE_FAILED:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    case Types.DISMISS_MESSAGES_ERROR:
      return {
        ...state,
        error: '',
      };

    default:
      return state;
  }
};

const getChatList_action = () => ({
  type: Types.GET_CHAT_LIST
});

const getMessages_action = (payload) => ({
  type: Types.GET_MESSAGES,
  payload
});

const deleteMessages_action = (payload, resolve, reject) => ({
  type: Types.DELETE_MESSAGES,
  payload,
  resolve,
  reject
});

const sendMessage_action = (payload, resolve, reject) => ({
  type: Types.SEND_MESSAGE,
  payload,
  resolve,
  reject
});


const dismissMessagesError_action = () => ({
  type: Types.DISMISS_MESSAGES_ERROR,
});

function* getChatList_operation() {
  try {
    const response = yield api.getChatList();
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_CHAT_LIST_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status) {
        yield put({
          type: Types.GET_CHAT_LIST_SUCCESS,
          payload: response?.data || []
        });
      } else {
        yield put({
          type: Types.GET_CHAT_LIST_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_CHAT_LIST_FAILED,
      error: error.message,
    });
  }
}
function* watch_getChatList() {
  yield takeLatest(Types.GET_CHAT_LIST, getChatList_operation);
}

function* getMessages_operation(action) {
  try {
    const response = yield api.getMessages(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.GET_MESSAGES_FAILED,
        error: response.error,
      });
    } else {
      if (response?.status === "OK") {
        yield put({
          type: Types.GET_MESSAGES_SUCCESS,
          payload: response?.data || []
        });
      } else {
        yield put({
          type: Types.GET_MESSAGES_FAILED,
          error: response.message,
        });
      }
    }
  } catch (error) {
    yield put({
      type: Types.GET_MESSAGES_FAILED,
      error: error.message,
    });
  }
}
function* watch_getMessages() {
  yield takeLatest(Types.GET_MESSAGES, getMessages_operation);
}

function* deleteMessages_operation(action) {
  try {
    const response = yield api.deleteMessages(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.DELETE_MESSAGES_FAILED,
        error: response?.error,
      });
      action.reject(response?.error)
    } else {
      if (response?.status === "OK") {
        yield put({
          type: Types.DELETE_MESSAGES_SUCCESS
        });
        action.resolve(response)
      } else {
        yield put({
          type: Types.DELETE_MESSAGES_FAILED,
          error: response?.message,
        });
        action.reject(response?.error)
      }
    }
  } catch (error) {
    yield put({
      type: Types.DELETE_MESSAGES_FAILED,
      error: error.message,
    });
    action.reject(error.message)
  }
}
function* watch_deleteMessages() {
  yield takeLatest(Types.DELETE_MESSAGES, deleteMessages_operation);
}

function* sendMessage_operation(action) {
  try {
    const response = yield api.sendMessage(action.payload);
    if (response.hasOwnProperty('error')) {
      yield put({
        type: Types.SEND_MESSAGE_FAILED,
        error: response?.error,
      });
      action.reject(response?.error)
    } else {
      if (response?.status === "OK") {
        yield put({
          type: Types.SEND_MESSAGE_SUCCESS
        });
        action.resolve()
      } else {
        yield put({
          type: Types.SEND_MESSAGE_FAILED,
          error: response?.message,
        });
        action.reject(response?.message)
      }
    }
  } catch (error) {
    yield put({
      type: Types.SEND_MESSAGE_FAILED,
      error: error.message,
    });
    action.reject(error.message)
  }
}
function* watch_sendMessage() {
  yield takeLatest(Types.SEND_MESSAGE, sendMessage_operation);
}


export default messages_reducer;
export {
  Types,
  getChatList_action,
  getMessages_action,
  sendMessage_action,
  deleteMessages_action,
  dismissMessagesError_action,
  watch_getChatList,
  watch_getMessages,
  watch_sendMessage,
  watch_deleteMessages
};
