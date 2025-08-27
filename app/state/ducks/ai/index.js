import {put, takeLatest} from 'redux-saga/effects';
import api from '@fetch/api';
const Types = {
    SAVE_INSPECTION: 'SAVE_INSPECTION/saveInspection',
    SAVE_INSPECTION_FAILED: 'SAVE_INSPECTION_FAILED/saveInspection',
    SAVE_INSPECTION_SUCCESS: 'SAVE_INSPECTION_SUCCESS/saveInspection',
    DISMISS_SAVE_INSPECTION_ERROR: 'DISMISS_SAVE_INSPECTION_ERROR/saveInspection',
};

const INITIAL_STATE = {
    loader: false,
    error: '',
    message: '',
    data: null,
};
const saveInspection_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.SAVE_INSPECTION:
            return {
                ...state,
                loader: true,
                error: '',
            };
        case Types.SAVE_INSPECTION_SUCCESS:
            return {
                ...state,
                loader: false,
                message: action.payload,
            };
        case Types.SAVE_INSPECTION_FAILED:
            return {
                ...state,
                loader: false,
                error: action.error,
            };
        case Types.DISMISS_SAVE_INSPECTION_ERROR:
            return INITIAL_STATE;

        default:
            return state;
    }
};

const saveInspection_action = (payload, resolve, reject) => ({
    type: Types.SAVE_INSPECTION,
    payload,
    resolve,
    reject,
});

const dismissSaveInspectionError_action = () => ({
    type: Types.SAVE_INSPECTION_SUCCESS,
});

function* saveInspection_operation(action) {
    try {
        const response = yield api.saveInspection(action.payload);
        if (response?.status === "success") {
            yield put({
                type: Types.SAVE_INSPECTION_SUCCESS,
                data: response.message,
            });
            action.resolve(response);
        } else {
            yield put({
                type: Types.SAVE_INSPECTION_FAILED,
                error: response.message,
            });
            action.reject(response);
        }
    } catch (error) {
        yield put({
            type: Types.SAVE_INSPECTION_FAILED,
            error: error.response,
        });
        action.reject(error);
    }
}
function* watch_saveInspection() {
    yield takeLatest(Types.SAVE_INSPECTION, saveInspection_operation);
}

export default saveInspection_reducer;
export {
    Types,
    saveInspection_action,
    dismissSaveInspectionError_action,
    watch_saveInspection,
};
