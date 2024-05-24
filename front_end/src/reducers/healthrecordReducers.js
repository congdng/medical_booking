import {
    EXERCISE_RECORD_DETAIL_GET, EXERCISE_RECORD_DETAIL_GETFAIL, EXERCISE_RECORD_DETAIL_REQUEST, EXERCISE_RECORD_GET, EXERCISE_RECORD_GET_FAIL, EXERCISE_RECORD_REQUEST, EXERCISE_RECORD_SAVE, EXERCISE_RECORD_SAVE_FAIL,
    HEALTH_RECORD_DETAIL_REQUEST,
    HEALTH_RECORD_GET, HEALTH_RECORD_GET_FAIL, HEALTH_RECORD_LIST_REQUEST, HEALTH_RECORD_REQUEST, HEALTH_RECORD_SAVE, HEALTH_RECORD_SAVE_FAIL,
    HEALTH_RECORD_SAVE_RESET
} from "../constants/HRConstant";

export const exerciseRecordUpdateReducers = (state = {}, action) => {
    switch (action.type) {
        case EXERCISE_RECORD_REQUEST:
            return { loading: true };
        case EXERCISE_RECORD_SAVE:
            return { loading: false, saveData: action.payload };
        case EXERCISE_RECORD_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const exerciseRecordListReducers = (state = {records: []}, action) => {
    switch (action.type) {
        case EXERCISE_RECORD_REQUEST:
            return { loading: true };
        case EXERCISE_RECORD_GET:
            return { loading: false, records: action.payload };
        case EXERCISE_RECORD_GET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const exerciseRecordDetailReducers = (state = { appointment: [] }, action) => {
    switch (action.type) {
        case EXERCISE_RECORD_DETAIL_REQUEST:
            return { loading: true };
        case EXERCISE_RECORD_DETAIL_GET:
            return { loading: false, appointment: action.payload };
        case EXERCISE_RECORD_DETAIL_GETFAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const healthRecordReducers = (state = {}, action) => {
    switch (action.type) {
        case HEALTH_RECORD_REQUEST:
            return { loading: true };
        case HEALTH_RECORD_SAVE:
            return { loading: false, saveData: action.payload };
        case HEALTH_RECORD_SAVE_FAIL:
            return { loading: false, error: action.payload };
        case HEALTH_RECORD_SAVE_RESET:
            return {};
        default:
            return state;
    }

}
export const healthRecordListReducers = (state = {records: []}, action) => {
    switch (action.type) {
        case HEALTH_RECORD_LIST_REQUEST:
            return { loading: true };
        case HEALTH_RECORD_GET:
            return { loading: false, records: action.payload };
        case HEALTH_RECORD_GET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
export const healthRecordDetailReducers = (state = { appointment: [] }, action) => {    
    switch (action.type) {
        case HEALTH_RECORD_DETAIL_REQUEST:
            return { loading: true };
        case HEALTH_RECORD_GET:
            return { loading: false, appointment: action.payload };
        case HEALTH_RECORD_GET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}