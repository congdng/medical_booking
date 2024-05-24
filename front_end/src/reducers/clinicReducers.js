import {
  CLINIC_CREATE_ACCESS,
  CLINIC_CREATE_FAIL,
  CLINIC_CREATE_REQUEST,
  CLINIC_CREATE_RESET,
  CLINIC_DELETE_ACCESS,
  CLINIC_DELETE_FAIL,
  CLINIC_DELETE_REQUEST,
  CLINIC_DETAIL_ACCESS,
  CLINIC_DETAIL_FAIL,
  CLINIC_DETAIL_REQUEST,
  CLINIC_DETAIL_RESET,
  CLINIC_LIST_ACCESS,
  CLINIC_LIST_FAIL,
  CLINIC_LIST_REQUEST,
  CLINIC_LIST_RESET,
  CLINIC_UPDATE_ACCESS,
  CLINIC_UPDATE_FAIL,
  CLINIC_UPDATE_REQUEST,
  CLINIC_UPDATE_RESET,
} from "../constants/clinicConstant";

export const clinicListReducers = (state = { clinics: [] }, action) => {
  switch (action.type) {
    case CLINIC_LIST_REQUEST:
      return { loading: true };
    case CLINIC_LIST_ACCESS:
      return { loading: false, clinics: action.payload };
    case CLINIC_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CLINIC_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const clinicCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case CLINIC_CREATE_REQUEST:
      return { loading: true };
    case CLINIC_CREATE_ACCESS:
      return { loading: false, message: action.payload };
    case CLINIC_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CLINIC_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const clinicDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case CLINIC_DELETE_REQUEST:
      return { loading: true };
    case CLINIC_DELETE_ACCESS:
      return { loading: false, success: true };
    case CLINIC_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clinicDetailsReducers = (state = { clinic: {} }, action) => {
  switch (action.type) {
    case CLINIC_DETAIL_REQUEST:
      return { ...state, loading: true };
    case CLINIC_DETAIL_ACCESS:
      return { loading: false, clinic: action.payload };
    case CLINIC_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case CLINIC_DETAIL_RESET: {
      return { clinic: {} };
    }
    default:
      return state;
  }
};

export const clinicUpdateReducers = (state = { clinic: {} }, action) => {
  switch (action.type) {
    case CLINIC_UPDATE_REQUEST:
      return { loading: true };
    case CLINIC_UPDATE_ACCESS:
      return { loading: false, success: true };
    case CLINIC_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CLINIC_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
