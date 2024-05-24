import {
  MEDICINE_DELETE_ACCESS,
  MEDICINE_DELETE_FAIL,
  MEDICINE_DELETE_REQUEST,
  MEDICINE_DETAIL_ACCESS,
  MEDICINE_DETAIL_FAIL,
  MEDICINE_DETAIL_REQUEST,
  MEDICINE_DETAIL_RESET,
  MEDICINE_LIST_ACCESS,
  MEDICINE_LIST_FAIL,
  MEDICINE_LIST_REQUEST,
  MEDICINE_LIST_RESET,
  MEDICINE_PRESCRIPTION_ACCESS,
  MEDICINE_PRESCRIPTION_FAIL,
  MEDICINE_PRESCRIPTION_REQUEST,
} from "../constants/medicineConstant";

export const medicineListReducers = (state = { medicines: [] }, action) => {
  switch (action.type) {
    case MEDICINE_LIST_REQUEST:
      return { loading: true };
    case MEDICINE_LIST_ACCESS:
      return { loading: false, medicines: action.payload };
    case MEDICINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MEDICINE_LIST_RESET:
      return { medicines: [] };
    default:
      return state;
  }
};

export const medicineDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case MEDICINE_DELETE_REQUEST:
      return { loading: true };
    case MEDICINE_DELETE_ACCESS:
      return { loading: false, success: true };
    case MEDICINE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const medicineDetailsReducers = (state = { medicine: {} }, action) => {
  switch (action.type) {
    case MEDICINE_DETAIL_REQUEST:
      return { ...state, loading: true };
    case MEDICINE_DETAIL_ACCESS:
      return { loading: false, medicine: action.payload };
    case MEDICINE_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case MEDICINE_DETAIL_RESET: {
      return { medicine: {} };
    }
    default:
      return state;
  }
};

export const medicinePrescriptionReducers = (state = { prelist: [] }, action) => {
  switch (action.type) {
    case MEDICINE_PRESCRIPTION_REQUEST:
      return { loading: true };
    case MEDICINE_PRESCRIPTION_ACCESS:
      return { loading: false, prelist: action.payload };
    case MEDICINE_PRESCRIPTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};