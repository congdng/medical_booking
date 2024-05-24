
import axios from "axios";
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
  PHY_APPOINTMENT_UPDATE_ACCESS,
  PHY_APPOINTMENT_UPDATE_FAIL,
  PHY_APPOINTMENT_UPDATE_REQUEST,
  PHY_APPOINTMENT_USER_ACCESS,
  PHY_APPOINTMENT_USER_FAIL,
  PHY_APPOINTMENT_USER_REQUEST,
  PHY_APPOINTMENT_PAY_ACCESS,
  PHY_APPOINTMENT_PAY_FAIL,
  PHY_APPOINTMENT_PAY_REQUEST,
} from "../constants/appointmentConstant";

export const make_phy_appointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_CREATE_REQUEST,
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
    const { data } = await axios.post(
      `http://localhost:8000/api/phyapp`,
      appointment,
      config
    );

    dispatch({
      type: PHY_APPOINTMENT_CREATE_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_CREATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const pay_phy_appointment = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_PAY_REQUEST
    })
    const { userLogin: { userInfo } } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `http://localhost:8000/api/phyapp/${id}/pay`,
      paymentResult,
      config
    )

    dispatch({
      type: PHY_APPOINTMENT_PAY_ACCESS,
      payload: data
    })
  }
  catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_PAY_FAIL,
      payload: e.response && e.response.data.error
        ? e.response.data.error
        : e.message,
    })
  }
}













export const get_phy_apppointment_patient = (patient_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_LIST_REQUEST,
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
    const { data } = await axios.get(
      `http://localhost:8000/api/phyapp/patient/${patient_id}`,
      config
    );
    dispatch({
      type: PHY_APPOINTMENT_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }



};


export const list_phy_apppointment_trainer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_LIST_REQUEST,
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
    const { data } = await axios.get(
      `http://localhost:8000/api/phyapp/trainer/${userInfo._id}`,
      config
    );
    dispatch({
      type: PHY_APPOINTMENT_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};
export const list_phy_apppointment = (role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_LIST_REQUEST,
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
    const { data } = await axios.get(
      `http://localhost:8000/api/phyapp/${role}/${userInfo._id}`,
      config
    );
    dispatch({
      type: PHY_APPOINTMENT_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const get_phy_apppointment = (app_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_DETAIL_REQUEST,
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
    const { data } = await axios.get(
      `http://localhost:8000/api/phyapp/${app_id}`,
      config
    );

    dispatch({
      type: PHY_APPOINTMENT_DETAIL_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_DETAIL_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
}

export const update_status = (id, status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PHY_APPOINTMENT_UPDATE_REQUEST,
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
      `http://localhost:8000/api/phyapp/${id}/statusUpdate`,
      {
        status: status
      },
      config
    )
    dispatch({
      type: PHY_APPOINTMENT_UPDATE_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PHY_APPOINTMENT_UPDATE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }

}