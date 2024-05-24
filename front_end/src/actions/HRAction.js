import axios from "axios";
import {
  HEALTH_RECORD_GET, HEALTH_RECORD_GET_FAIL, HEALTH_RECORD_LIST_REQUEST, HEALTH_RECORD_REQUEST,
  HEALTH_RECORD_SAVE,
  HEALTH_RECORD_SAVE_FAIL,
} from "../constants/HRConstant";

export const create_health_record = (patient_id, body) => async (dispatch, getState) => {

  try {
    dispatch({
      type: HEALTH_RECORD_REQUEST
    })

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `http://localhost:8000/api/healthrecord/patient/${patient_id}`,
      body,
      config
    );
    dispatch({
      type: HEALTH_RECORD_SAVE,
      payload: data
    })


  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: HEALTH_RECORD_SAVE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}
export const save_health_record = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HEALTH_RECORD_REQUEST
    });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`http://localhost:8000/api/healthrecord/save/${id}`, body, config)
      .then(response =>
        response.json())
      .then(data =>
        dispatch({
          type: HEALTH_RECORD_SAVE,
          payload: data
        }))
      .catch(err => {
        console.log("ERR", err)
        dispatch({
          type: HEALTH_RECORD_SAVE_FAIL,
          payload:
            err,
        })
      });

  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: HEALTH_RECORD_SAVE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}

export const update_health_record = (id, body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HEALTH_RECORD_REQUEST
    });

    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(`http://localhost:8000/api/healthrecord/update/${id}`, body, config)
      .then(response =>
        dispatch({
          type: HEALTH_RECORD_SAVE,
          payload: response.data
        }))
      .catch(err => {
        console.log("ERR", err)
        dispatch({
          type: HEALTH_RECORD_SAVE_FAIL,
          payload:
            err,
        })
      });

  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: HEALTH_RECORD_SAVE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}

export const health_record_list = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    dispatch({
      type: HEALTH_RECORD_LIST_REQUEST
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.get(`http://localhost:8000/api/healthrecord/patient/${id}`, config)
      .then(response =>
        dispatch({
          type: HEALTH_RECORD_GET,
          payload: response.data
        }))
      .catch(e => {
        console.log("ERR", e)
        dispatch({
          type: HEALTH_RECORD_GET_FAIL,
          payload:
            e.response && e.response.data.message
              ? e.response.data.message
              : e.message,
        })
      })

  } catch (e) {
    console.log("ERR", e)
    dispatch({
      type: HEALTH_RECORD_GET_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}
