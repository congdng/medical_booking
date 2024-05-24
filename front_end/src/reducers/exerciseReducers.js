import { EXERCISE_DELETE_ACCESS, EXERCISE_DELETE_FAIL, EXERCISE_DELETE_REQUEST, EXERCISE_DETAIL_ACCESS, EXERCISE_DETAIL_FAIL, EXERCISE_DETAIL_REQUEST, EXERCISE_DETAIL_RESET, EXERCISE_LIST_ACCESS, EXERCISE_LIST_FAIL, EXERCISE_LIST_REQUEST, EXERCISE_LIST_RESET, EXERCISE_PATIENT_LIST_ACCESS, EXERCISE_PATIENT_LIST_FAIL, EXERCISE_PATIENT_LIST_REQUEST, EXERCISE_PATIENT_LIST_RESET } from "../constants/exerciseConstant";

export const exerciseListOfPatientReducers = (state = { exercises: [] }, action) => { 
  switch (action.type) {
    case EXERCISE_PATIENT_LIST_REQUEST:
      return { loading: true };
    case EXERCISE_PATIENT_LIST_ACCESS:
      return { loading: false, exercises: action.payload };
    case EXERCISE_PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EXERCISE_PATIENT_LIST_RESET:
      return { exercises: [] };
    default:
      return state;
  }
}
export const exerciseListReducers = (state = { exercises: [] }, action) => {
  switch (action.type) {
    case EXERCISE_LIST_REQUEST:
      return { loading: true };
    case EXERCISE_LIST_ACCESS:
      return { loading: false, exercises: action.payload };
    case EXERCISE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EXERCISE_LIST_RESET:
      return { exercises: [] };
    default:
      return state;
  }
};


export const exerciseDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case EXERCISE_DELETE_REQUEST:
      return { loading: true };
    case EXERCISE_DELETE_ACCESS:
      return { loading: false, success: true };
    case EXERCISE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const exerciseDetailsReducers = (state = { exercise: {} }, action) => {
  switch (action.type) {
    case EXERCISE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case EXERCISE_DETAIL_ACCESS:
      return { loading: false, exercise: action.payload };
    case EXERCISE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case EXERCISE_DETAIL_RESET: {
      return { exercise: {} };
    }
    default:
      return state;
  }
};
