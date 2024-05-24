import {
  APPOINTMENT_CREATE_ACCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_DETAIL_ACCESS,
  APPOINTMENT_DETAIL_FAIL,
  APPOINTMENT_DETAIL_REQUEST,
  APPOINTMENT_LIST_ACCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_RESET,
  APPOINTMENT_PAY_ACCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_UPDATE_ACCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_RESET,
  APPOINTMENT_USER_ACCESS,
  APPOINTMENT_USER_FAIL,
  APPOINTMENT_USER_REQUEST,
  APPOINTMENT_USER_RESET,
} from "../constants/appointmentConstant";

export const makeAppointmentReducers = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case APPOINTMENT_CREATE_ACCESS:
      return {
        loading: false,
        success: true,
        appointment: action.payload,
      };
    case APPOINTMENT_CREATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentDetailReducers = (
  state = { loading: true, appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case APPOINTMENT_DETAIL_ACCESS:
      return {
        loading: false,
        appointment: action.payload,
      };
    case APPOINTMENT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const appointmentPayReducers = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_PAY_REQUEST:
      return {
        loading: true,
      };
    case APPOINTMENT_PAY_ACCESS:
      return {
        loading: false,
        success: true,
      };
    case APPOINTMENT_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case APPOINTMENT_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const appointmentUserReducers = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_USER_REQUEST:
      return {
        loading: true,
      };
    case APPOINTMENT_USER_ACCESS:
      return {
        loading: false,
        appointments: action.payload,
      };
    case APPOINTMENT_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case APPOINTMENT_USER_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const appointmentListReducers = (state = { appointments: [] }, action) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_LIST_ACCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_LIST_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const appointmentUpdateReducers = (state = { appointment: {} }, action) => {
  switch (action.type) {
    case APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_UPDATE_ACCESS:
      return { loading: false, success: true };
    case APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};


