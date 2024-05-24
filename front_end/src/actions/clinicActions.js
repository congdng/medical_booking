import axios from "axios";
import {
  CLINIC_CREATE_ACCESS,
  CLINIC_CREATE_FAIL,
  CLINIC_CREATE_REQUEST,
  CLINIC_DELETE_ACCESS,
  CLINIC_DELETE_FAIL,
  CLINIC_DELETE_REQUEST,
  CLINIC_DETAIL_ACCESS,
  CLINIC_DETAIL_FAIL,
  CLINIC_DETAIL_REQUEST,
  CLINIC_LIST_ACCESS,
  CLINIC_LIST_FAIL,
  CLINIC_LIST_REQUEST,
  CLINIC_UPDATE_ACCESS,
  CLINIC_UPDATE_FAIL,
  CLINIC_UPDATE_REQUEST,
} from "../constants/clinicConstant";

export const list_clinics = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLINIC_LIST_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "http://localhost:8000/api/clinics",
      config
    );
    dispatch({
      type: CLINIC_LIST_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: CLINIC_LIST_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const create_clinic =
  (name, description, link, image, special) => async (dispatch) => {
    try {
      dispatch({
        type: CLINIC_CREATE_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/clinics",
        {
          name,
          description,
          link,
          image,
          special,
        },
        config
      );

      dispatch({
        type: CLINIC_CREATE_ACCESS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: CLINIC_CREATE_FAIL,
        payload:
          e.response && e.response.data.error
            ? e.response.data.error
            : e.message,
      });
    }
  };

  export const delete_clinic = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CLINIC_DELETE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:8000/api/clinics/${id}`,
        config
      );
      dispatch({
        type: CLINIC_DELETE_ACCESS,
      });
    } catch (e) {
      dispatch({
        type: CLINIC_DELETE_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  export const get_clinic_detail = (id) => async (dispatch) => {
    try {
      dispatch({
        type: CLINIC_DETAIL_REQUEST
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .get(`http://localhost:8000/api/clinics/${id}`, config)
        .then((data) => {
          dispatch({
            type: CLINIC_DETAIL_ACCESS,
            payload: data.data,
          });
        });
    } catch (e) {
      dispatch({
        type: CLINIC_DETAIL_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  export const update_clinic = (clinic) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CLINIC_UPDATE_REQUEST,
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
        `http://localhost:8000/api/clinics/${clinic._id}`,
        clinic,
        config
      );
  
      dispatch({
        type: CLINIC_UPDATE_ACCESS,
      });
      dispatch({
        type: CLINIC_DETAIL_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: CLINIC_UPDATE_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };