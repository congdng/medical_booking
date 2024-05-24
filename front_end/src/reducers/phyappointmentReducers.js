import {
  PHY_APPOINTMENT_CREATE_ACCESS,
  PHY_APPOINTMENT_CREATE_FAIL,
  PHY_APPOINTMENT_CREATE_REQUEST,
  PHY_APPOINTMENT_CREATE_RESET,
  PHY_APPOINTMENT_DETAIL_ACCESS,
  PHY_APPOINTMENT_DETAIL_FAIL,
  PHY_APPOINTMENT_DETAIL_REQUEST,
  PHY_APPOINTMENT_LIST_ACCESS,
  PHY_APPOINTMENT_LIST_FAIL,
  PHY_APPOINTMENT_LIST_REQUEST,
  PHY_APPOINTMENT_LIST_RESET,
  PHY_APPOINTMENT_PAY_ACCESS,
  PHY_APPOINTMENT_PAY_FAIL,
  PHY_APPOINTMENT_PAY_REQUEST,
  PHY_APPOINTMENT_PAY_RESET,
  PHY_APPOINTMENT_UPDATE_ACCESS,
  PHY_APPOINTMENT_UPDATE_FAIL,
  PHY_APPOINTMENT_UPDATE_REQUEST,
  PHY_APPOINTMENT_UPDATE_RESET,
  PHY_APPOINTMENT_USER_ACCESS,
  PHY_APPOINTMENT_USER_FAIL,
  PHY_APPOINTMENT_USER_REQUEST,
  PHY_APPOINTMENT_USER_RESET,
} from "../constants/appointmentConstant";

export const makePhyAppointmentReducers = (state = {}, action) => {
  switch (action.type) {
    case PHY_APPOINTMENT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PHY_APPOINTMENT_CREATE_ACCESS:
      return {
        loading: false,
        success: true,
        appointment: action.payload,
      };
    case PHY_APPOINTMENT_CREATE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case PHY_APPOINTMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const phyAppointmentDetailReducers = (
  state = { loading: true, appointment: {} },
  action
) => {
  switch (action.type) {
    case PHY_APPOINTMENT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PHY_APPOINTMENT_DETAIL_ACCESS:
      return {
        loading: false,
        appointment: action.payload,
      };
    case PHY_APPOINTMENT_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const phyAppointmentPayReducers = (state = {}, action) => {
  switch (action.type) {
    case PHY_APPOINTMENT_PAY_REQUEST:
      return {
        loading: true,
      };
    case PHY_APPOINTMENT_PAY_ACCESS:
      return {
        loading: false,
        success: true,
      };
    case PHY_APPOINTMENT_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PHY_APPOINTMENT_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const phyAppointmentUserReducers = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case PHY_APPOINTMENT_USER_REQUEST:
      return {
        loading: true,
      };
    case PHY_APPOINTMENT_USER_ACCESS:
      return {
        loading: false,
        appointments: action.payload,
      };
    case PHY_APPOINTMENT_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PHY_APPOINTMENT_USER_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const phyAppointmentListReducers = (state = { appointments: [] }, action) => {
  switch (action.type) {
    case PHY_APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case PHY_APPOINTMENT_LIST_ACCESS:
      return { loading: false, appointments: action.payload };
    case PHY_APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PHY_APPOINTMENT_LIST_RESET:
      return { appointments: [] };
    default:
      return state;
  }
};

export const phyAppointmentUpdateReducers = (state = { appointment: {} }, action) => {
  switch (action.type) {
    case PHY_APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case PHY_APPOINTMENT_UPDATE_ACCESS:
      return { loading: false, success: true , appointment: action.payload};
    case PHY_APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PHY_APPOINTMENT_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};


