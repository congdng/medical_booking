import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_ACCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_ACCESS,
  USER_REGISTER_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_ACCESS,
  USER_ACTIVATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_ACCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_ACCESS,
  USER_DELETE_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_ACCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_RESET,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_ACCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_UPDATE_ADMIN_RESET,
  USER_ADMIN_REGISTER_REQUEST,
  USER_ADMIN_REGISTER_ACCESS,
  USER_ADMIN_REGISTER_FAIL,
  USER_ADMIN_REGISTER_RESET,
  DOCTOR_DETAIL_REQUEST,
  DOCTOR_DETAIL_ACCESS,
  DOCTOR_DETAIL_FAIL,
  DOCTOR_DETAIL_RESET,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_ACCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_RESET,
  DOCTOR_REVIEW_REQUEST,
  DOCTOR_REVIEW_ACCESS,
  DOCTOR_REVIEW_FAIL,
  DOCTOR_REVIEW_RESET,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_ACCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_UPDATE_RESET,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_ACCESS,
  TRAINER_LIST_FAIL,
} from "../constants/userConstant";
export const userLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_ACCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_ACCESS:
      return { loading: false, message: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userAdminRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case USER_ADMIN_REGISTER_ACCESS:
      return { loading: false, message: action.payload };
    case USER_ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userActivationReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_ACTIVATE_REQUEST:
      return { loading: true };
    case USER_ACTIVATE_ACCESS:
      return { loading: false, userInfo: action.payload };
    case USER_ACTIVATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducers = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_ACCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_ACCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case USER_DETAIL_ACCESS:
      return { loading: false, user: action.payload };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAIL_RESET: {
      return { user: {} };
    }
    default:
      return state;
  }
};

export const userUpdateReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_ADMIN_REQUEST:
      return { loading: true };
    case USER_UPDATE_ADMIN_ACCESS:
      return { loading: false, success: true };
    case USER_UPDATE_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_ADMIN_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const doctorDetailsReducers = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DETAIL_REQUEST:
      return { ...state, loading: true };
    case DOCTOR_DETAIL_ACCESS:
      return { loading: false, doctor: action.payload };
    case DOCTOR_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_DETAIL_RESET: {
      return { user: {} };
    }
    default:
      return state;
  }
};

export const doctorListReducers = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { loading: true };
    case DOCTOR_LIST_ACCESS:
      return { loading: false, doctors: action.payload };
    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const doctorReviewReducers = (state = {}, action) => {
  switch (action.type) {
      case DOCTOR_REVIEW_REQUEST:
          return { loading: true };
      case DOCTOR_REVIEW_ACCESS:
          return { loading: false, success: true };
      case DOCTOR_REVIEW_FAIL:
          return { loading: false, error: action.payload };
      case DOCTOR_REVIEW_RESET:
          return {};
      default:
          return state;
  }
};

export const doctorUpdateReducers = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_REQUEST:
      return { loading: true };
    case DOCTOR_UPDATE_ACCESS:
      return { loading: false, success: true };
    case DOCTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_UPDATE_RESET:
      return { doctor: {} };
    default:
      return state;
  }
};

export const trainerListReducers = (state = { trainer: [] }, action) => {
  switch (action.type) {
    case TRAINER_LIST_REQUEST:
      return { loading: true };
    case TRAINER_LIST_ACCESS:
      return { loading: false, trainer: action.payload };
    case TRAINER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
