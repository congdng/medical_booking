import axios from "axios";
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
  APPOINTMENT_PAY_ACCESS,
  APPOINTMENT_PAY_FAIL,
  APPOINTMENT_PAY_REQUEST,
  APPOINTMENT_UPDATE_ACCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_USER_ACCESS,
  APPOINTMENT_USER_FAIL,
  APPOINTMENT_USER_REQUEST,
} from "../constants/appointmentConstant";

export const make_appointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:8000/api/appointments`,
      appointment,
      config
    );

    dispatch({
      type: APPOINTMENT_CREATE_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const get_appointment_detail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/api/appointments/${id}`,
      config
    );

    dispatch({
      type: APPOINTMENT_DETAIL_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: APPOINTMENT_DETAIL_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const pay_appointment = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_PAY_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}` 
      }
    }

    const { data } = await axios.put(
      `http://localhost:8000/api/appointments/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: APPOINTMENT_PAY_ACCESS,
      payload: data
    })
  }
  catch (e) {
    dispatch({
      type: APPOINTMENT_PAY_FAIL,
      payload: e.response && e.response.data.error
        ? e.response.data.error
        : e.message,
    })
  }
}

export const list_user_appointments = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_USER_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(
      `http://localhost:8000/api/appointments/${id}/myOrder`,
      config
    )

    dispatch({
      type: APPOINTMENT_USER_ACCESS,
      payload: data
    })
  }
  catch (e) {
    dispatch({
      type: APPOINTMENT_USER_FAIL,
      payload: e.response && e.response.data.message
        ? e.response.data.message
        : e.message,
    })
  }
}

export const list_appointments = () =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: APPOINTMENT_LIST_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/appointments`,
        config
      );
      dispatch({
        type: APPOINTMENT_LIST_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

export const update_appointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:8000/api/appointments/${appointment._id}/update`,
      appointment,
      config
    );

    dispatch({
      type: APPOINTMENT_UPDATE_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};