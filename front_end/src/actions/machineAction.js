import {
  MACHINE_LIST_ACCESS,
  MACHINE_LIST_FAIL,
  MACHINE_LIST_REQUEST,
} from "../constants/machineConstant";
import axios from "axios";

export const list_machines = () => async (dispatch) => {
  try {
    dispatch({
      type: MACHINE_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/machines",
      config
    );
    dispatch({
      type: MACHINE_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: MACHINE_LIST_FAIL,
      payload:
        e.response && e.response.data.error ? e.response.data.error : e.error,
    });
  }
};
