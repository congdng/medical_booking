import {
  EXERCISE_DETAIL_ACCESS,
  EXERCISE_DETAIL_REQUEST,
  EXERCISE_LIST_ACCESS,
  EXERCISE_LIST_FAIL,
  EXERCISE_LIST_REQUEST,
} from "../constants/exerciseConstant";
import axios from "axios";

export const list_exercises = () => async (dispatch) => {
  try {
    dispatch({
      type: EXERCISE_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/exercises",
      config
    );
    dispatch({
      type: EXERCISE_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: EXERCISE_LIST_FAIL,
      payload:
        e.response && e.response.data.error ? e.response.data.error : e.error,
    });
  }
};
export const get_exercise_details = (id) => async(dispatch) =>{
  dispatch({
    type: EXERCISE_DETAIL_REQUEST,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.get(
    `http://localhost:8000/api/exercises/${id}`,
    config
  );
  dispatch({
    type: EXERCISE_DETAIL_ACCESS,
    payload: data,
  });

}
