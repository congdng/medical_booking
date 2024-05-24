import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  doctorDetailsReducers,
  doctorListReducers,
  doctorReviewReducers,
  doctorUpdateReducers,
  trainerListReducers,
  userActivationReducers,
  userAdminRegisterReducers,
  userDeleteReducers,
  userDetailsReducers,
  userListReducers,
  userLoginReducers,
  userRegisterReducers,
  userUpdateReducers,
} from "./reducers/userReducers";
import {
  clinicCreateReducers,
  clinicDeleteReducers,
  clinicDetailsReducers,
  clinicListReducers,
  clinicUpdateReducers,
} from "./reducers/clinicReducers";
import {
  appointmentDetailReducers,
  appointmentListReducers,
  appointmentPayReducers,
  appointmentUpdateReducers,
  appointmentUserReducers,
  makeAppointmentReducers,
} from "./reducers/appointmentReducers";
import {
  machineDeleteReducers,
  machineDetailsReducers,
  machineListReducers,
} from "./reducers/machineReducers";
import {
  medicineDeleteReducers,
  medicineDetailsReducers,
  medicineListReducers,
  medicinePrescriptionReducers,
} from "./reducers/medicineReducers";
import {
  exerciseDeleteReducers,
  exerciseDetailsReducers,
  exerciseListReducers,
} from "./reducers/exerciseReducers";
import { chatListReducers } from "./reducers/chatReducers";
import {
  healthRecordReducers,
  exerciseRecordDetailReducers,
  exerciseRecordListReducers,
  exerciseRecordUpdateReducers,
  healthRecordListReducers
} from "./reducers/healthrecordReducers";
import { 
  makePhyAppointmentReducers, 
  phyAppointmentDetailReducers, 
  phyAppointmentListReducers, 
  phyAppointmentPayReducers, 
  phyAppointmentUpdateReducers, 
  phyAppointmentUserReducers 
} from "./reducers/phyappointmentReducers";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userActivation: userActivationReducers,
  userList: userListReducers,
  userDelete: userDeleteReducers,
  userDetails: userDetailsReducers,
  userUpdate: userUpdateReducers,
  userAdminRegister: userAdminRegisterReducers,
  clinicList: clinicListReducers,
  clinicCreate: clinicCreateReducers,
  clinicDelete: clinicDeleteReducers,
  clinicDetail: clinicDetailsReducers,
  clinicUpdate: clinicUpdateReducers,
  machineList: machineListReducers,
  machineDelete: machineDeleteReducers,
  machineDetail: machineDetailsReducers,
  medicineList: medicineListReducers,
  medicineDelete: medicineDeleteReducers,
  medicineDetail: medicineDetailsReducers,
  medicinePList: medicinePrescriptionReducers,
  exerciseList: exerciseListReducers,
  exerciseDelete: exerciseDeleteReducers,
  exerciseDetail: exerciseDetailsReducers,
  doctorDetail: doctorDetailsReducers,
  doctorList: doctorListReducers,
  doctorReview: doctorReviewReducers,
  doctorUpdate: doctorUpdateReducers,
  appointmentCreate: makeAppointmentReducers,
  appointmentDetail: appointmentDetailReducers,
  appointmentPaid: appointmentPayReducers,
  appointmentUser: appointmentUserReducers,
  appointmentList: appointmentListReducers,
  appointmentUpdate: appointmentUpdateReducers,
  physicaltherapyAppointmentCreate: makePhyAppointmentReducers,
  physicaltherapyAppointmentDetail: phyAppointmentDetailReducers,
  physicaltherapyAppointmentPaid: phyAppointmentPayReducers,
  physicaltherapyAppointmentUser: phyAppointmentUserReducers,
  physicaltherapyAppointmentUpdate: phyAppointmentUpdateReducers,
  physicaltherapyAppointmentList: phyAppointmentListReducers,
  chatlistGET: chatListReducers,
  healthrecordUpdate: healthRecordReducers,
  healthrecordList: healthRecordListReducers,
  exerciserecordUpdate: exerciseRecordUpdateReducers,
  exerciserecordList: exerciseRecordListReducers,
  exerciserecordDetail: exerciseRecordDetailReducers,
  trainerList: trainerListReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
