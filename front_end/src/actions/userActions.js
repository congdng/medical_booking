
import { APPOINTMENT_LIST_ACCESS, APPOINTMENT_LIST_FAIL, APPOINTMENT_LIST_REQUEST } from "../constants/appointmentConstant";
import { CLINIC_DETAIL_RESET } from "../constants/clinicConstant";
import {
  USER_ACTIVATE_ACCESS,
  USER_ACTIVATE_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_LIST_RESET,
  USER_DETAIL_RESET,
  USER_LIST_ACCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LOGIN_ACCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_ACCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_DELETE_ACCESS,
  USER_DELETE_FAIL,
  USER_DETAIL_ACCESS,
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_UPDATE_ADMIN_REQUEST,
  USER_UPDATE_ADMIN_ACCESS,
  USER_UPDATE_ADMIN_FAIL,
  USER_ADMIN_REGISTER_REQUEST,
  USER_ADMIN_REGISTER_ACCESS,
  USER_ADMIN_REGISTER_FAIL,
  DOCTOR_DETAIL_REQUEST,
  DOCTOR_DETAIL_ACCESS,
  DOCTOR_DETAIL_FAIL,
  DOCTOR_DETAIL_RESET,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_ACCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_REVIEW_REQUEST,
  DOCTOR_REVIEW_ACCESS,
  DOCTOR_REVIEW_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_ACCESS,
  DOCTOR_UPDATE_FAIL,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_ACCESS,
  TRAINER_LIST_FAIL,
} from "../constants/userConstant";
import axios from "axios";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "http://localhost:8000/api/users/login",
      { username, password },
      config
    );
    dispatch({
      type: USER_LOGIN_ACCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAIL_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
  dispatch({
    type: DOCTOR_DETAIL_RESET,
  });
  dispatch({
    type: CLINIC_DETAIL_RESET,
  });
};

export const activate = (token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ACTIVATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/users/account_activation",
      {
        token,
      },
      config
    );
    dispatch({
      type: USER_ACTIVATE_ACCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_ACCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_ACTIVATE_FAIL,
      payload:
        e.response && e.response.data.error ? e.response.data.error : e.message,
    });
  }
};

export const register =
  (
    username,
    email,
    name,
    gender,
    dob,
    ethnic,
    nationality,
    phoneNumber,
    address,
    password,
    role = "patient"
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/users/register",
        {
          username,
          email,
          name,
          gender,
          dob,
          ethnic,
          nationality,
          phoneNumber,
          address,
          password,
          role,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          e.response && e.response.data.error
            ? e.response.data.error
            : e.message,
      });
    }
  };

export const register_as_admin =
  (
    username,
    email,
    name,
    gender,
    dob,
    ethnic,
    nationality,
    phoneNumber,
    address,
    password,
    role,
    roleInfo
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADMIN_REGISTER_REQUEST,
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
        "http://localhost:8000/api/users/admin_register",
        {
          username,
          email,
          name,
          gender,
          dob,
          ethnic,
          nationality,
          phoneNumber,
          address,
          password,
          role,
        },
        config
      );

      if (role=== 'trainer'){
        const {file, department, experience, language} =roleInfo;
        const formData = new FormData();
        formData.append('avatar', file);
        const avatarResponse = await axios.post("http://localhost:8000/api/avatarUpload",formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(result);
        const {data: avatarData} = avatarResponse;
        const toSend = {
          name,
          department,
          experience,
          language, 
          imageLink: avatarData.filename,
        }
        const {userData}= data
        const staffResponse = await axios.post(`http://localhost:8000/api/users/trainer/${userData._id}`, toSend, config)
        console.log(staffResponse)
      }

      dispatch({
        type: USER_ADMIN_REGISTER_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: USER_ADMIN_REGISTER_FAIL,
        payload:
          e.response && e.response.data.error
            ? e.response.data.error
            : e.message,
      });
    }
  };

export const list_users =
  (role = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
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
        `http://localhost:8000/api/users?role=${role}`,
        config
      );
      dispatch({
        type: USER_LIST_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

export const delete_user = (id, role) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    if (role === "trainer"){
      const {data: trainerData} = await axios.delete(
        `http://localhost:8000/api/users/trainer/${id}`,
        config);
    }
    const { data } = await axios.delete(
      `http://localhost:8000/api/users/${id}`,
      config
    );
    dispatch({
      type: USER_DELETE_ACCESS,
    });
  } catch (e) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const get_user_detail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAIL_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios
      .get(`http://localhost:8000/api/users/${id}`, config)
      .then((data) => {
        dispatch({
          type: USER_DETAIL_ACCESS,
          payload: data.data,
        });
      });
  } catch (e) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ADMIN_REQUEST,
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
      `http://localhost:8000/api/users/${user._id}`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_ADMIN_ACCESS,
    });
    dispatch({
      type: USER_DETAIL_ACCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_UPDATE_ADMIN_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const get_doctor_detail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_DETAIL_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(`http://localhost:8000/api/users/doctor/${id}`, config)
      .then((data) => {
        dispatch({
          type: DOCTOR_DETAIL_ACCESS,
          payload: data.data,
        });
      });
  } catch (e) {
    dispatch({
      type: DOCTOR_DETAIL_FAIL,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
};

export const list_doctors =
  (department = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_LIST_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
         
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/api/users/doctor?department=${department}`,
        config
      );
      dispatch({
        type: DOCTOR_LIST_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: DOCTOR_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  

export const review_doctor =
  (doctorID, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_REVIEW_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const userID = userInfo._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `http://localhost:8000/api/users/${doctorID}/reviews`,
        { review, userID },
        config
      );

      dispatch({
        type: DOCTOR_REVIEW_ACCESS,
      });
    } catch (e) {
      dispatch({
        type: DOCTOR_REVIEW_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };

  export const update_doctor = (doctor) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_UPDATE_REQUEST,
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
        `http://localhost:8000/api/users/doctor/${doctor._id}`,
        doctor,
        config
      );
  
      dispatch({
        type: DOCTOR_UPDATE_ACCESS,
      });
    } catch (e) {
      dispatch({
        type: DOCTOR_UPDATE_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };
  export const getDoctorAppointment = ()=> async (dispatch, getState) =>{
    try{
      dispatch({
        type: APPOINTMENT_LIST_REQUEST,
      });
      const { userLogin: {userInfo} } = getState() 
      const config = {
        headers :{
            Authorization: `Bearer ${userInfo.token}` 
        }
    }
    const { data } = await axios.get(
      `http://localhost:8000/api/appointments/doctor/${userInfo._id}`,
      config
  )
    dispatch({
    type: APPOINTMENT_LIST_ACCESS,
    payload: data
  })
    } catch (e) {
      dispatch({
        type: APPOINTMENT_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  }

  export const list_trainers =
  () =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINER_LIST_REQUEST,
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
        `http://localhost:8000/api/users/trainer`,
        config
      );
      dispatch({
        type: TRAINER_LIST_ACCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: TRAINER_LIST_FAIL,
        payload:
          e.response && e.response.data.message
            ? e.response.data.message
            : e.message,
      });
    }
  };