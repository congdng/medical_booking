import {
  MEDICINE_LIST_ACCESS,
  MEDICINE_LIST_FAIL,
  MEDICINE_LIST_REQUEST,
  MEDICINE_PRESCRIPTION_ACCESS,
  MEDICINE_PRESCRIPTION_FAIL,
  MEDICINE_PRESCRIPTION_REQUEST,
} from "../constants/medicineConstant";
import axios from "axios";

export const list_medicines = () => async (dispatch) => {
  try {
    dispatch({
      type: MEDICINE_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/medicines",
      config
    );
    dispatch({
      type: MEDICINE_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MEDICINE_LIST_FAIL,
      payload:
        e.response && e.response.data.error ? e.response.data.error : e.error,
    });
  }
};

export const pres_medicine = ({patient_id}) => async (dispatch) => {
  try{
    dispatch({
      type: MEDICINE_PRESCRIPTION_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `http://localhost:8000/api/healthrecord/med/${patient_id}`,
      config
    );
    dispatch({
      type: MEDICINE_PRESCRIPTION_ACCESS,
      payload: data,
    });
    
  }
  catch (e) {
    dispatch({
      type: MEDICINE_PRESCRIPTION_FAIL,
      payload:
        e.response && e.response.data.error ? e.response.data.error : e.error,
    });
  }
}

