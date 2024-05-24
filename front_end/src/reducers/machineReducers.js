import {
  MACHINE_DELETE_ACCESS,
  MACHINE_DELETE_FAIL,
  MACHINE_DELETE_REQUEST,
  MACHINE_DETAIL_ACCESS,
  MACHINE_DETAIL_FAIL,
  MACHINE_DETAIL_REQUEST,
  MACHINE_DETAIL_RESET,
  MACHINE_LIST_ACCESS,
  MACHINE_LIST_FAIL,
  MACHINE_LIST_REQUEST,
  MACHINE_LIST_RESET,
} from "../constants/machineConstant";

export const machineListReducers = (state = { machines: [] }, action) => {
  switch (action.type) {
    case MACHINE_LIST_REQUEST:
      return { loading: true };
    case MACHINE_LIST_ACCESS:
      return { loading: false, machines: action.payload };
    case MACHINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MACHINE_LIST_RESET:
      return { machines: [] };
    default:
      return state;
  }
};

export const machineDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case MACHINE_DELETE_REQUEST:
      return { loading: true };
    case MACHINE_DELETE_ACCESS:
      return { loading: false, success: true };
    case MACHINE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const machineDetailsReducers = (state = { machine: {} }, action) => {
  switch (action.type) {
    case MACHINE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case MACHINE_DETAIL_ACCESS:
      return { loading: false, machine: action.payload };
    case MACHINE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case MACHINE_DETAIL_RESET: {
      return { machine: {} };
    }
    default:
      return state;
  }
};
