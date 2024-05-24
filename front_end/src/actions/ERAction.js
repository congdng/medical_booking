import axios from "axios";
import {
  EXERCISE_RECORD_DETAIL_GET, EXERCISE_RECORD_DETAIL_GETFAIL, EXERCISE_RECORD_DETAIL_REQUEST,
  EXERCISE_RECORD_GET, EXERCISE_RECORD_GET_FAIL, EXERCISE_RECORD_REQUEST,
  EXERCISE_RECORD_SAVE,
  EXERCISE_RECORD_SAVE_FAIL,
} from "../constants/HRConstant";


export const save_exercise_record = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EXERCISE_RECORD_REQUEST
    })

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const trainer_id = userInfo._id

    const { data } = await axios.post(`http://localhost:8000/api/exrecord/save/${id}`, { ...body, trainer_id }, config)
    dispatch({
      type: EXERCISE_RECORD_SAVE,
      payload: data,
    })




  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: EXERCISE_RECORD_SAVE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
}

export const exercise_record_appt_details = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: EXERCISE_RECORD_DETAIL_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.get(`http://localhost:8000/api/exrecord/appt/${id}`, config)
      .then(response =>
        dispatch({
          type: EXERCISE_RECORD_DETAIL_GET,
          payload: response.data
        }))
      .catch(e => {
        console.log("ERR", e)
        dispatch({
          type: EXERCISE_RECORD_DETAIL_GETFAIL,
          payload:
            e.response && e.response.data.message
              ? e.response.data.message
              : e.message,
        })
      })

  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: EXERCISE_RECORD_DETAIL_GETFAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}

export const exercise_record_list = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: EXERCISE_RECORD_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.get(`http://localhost:8000/api/exrecord/patient/${id}`, config)
      .then(response =>
        dispatch({
          type: EXERCISE_RECORD_GET,
          payload: response.data
        }))
      .catch(e => {
        console.log("ERR", e)
        dispatch({
          type: EXERCISE_RECORD_GET_FAIL,
          payload:
            e.response && e.response.data.message
              ? e.response.data.message
              : e.message,
        })
      })

  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: EXERCISE_RECORD_GET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}


