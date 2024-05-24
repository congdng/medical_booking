import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import NotFoundScreen from "./screens/NotFoundScreen/NotFoundScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import RootLayout from "./layouts/RootLayout";
import RegisterScreen from "./screens/Register/RegisterScreen";
import ActivationEmailSceen from "./screens/ActivationEmailSceen/ActivationEmailSceen";
import ActivateAccountScreen from "./screens/ActivateAccountScreen/ActivateAccountScreen";
import AdminUserListScreen from "./screens/Admin/User/AdminUserListScreen";
import AdminUserEditScreen from "./screens/Admin/User/AdminUserEditScreen";
import AdminUserCreateScreen from "./screens/Admin/User/AdminUserCreateScreen";
import ServiceScreen from "./screens/Service/ServiceScreen";
import AdminClinicListScreen from "./screens/Admin/Clinic/AdminClinicListScreen";
import AdminClinicEditScreen from "./screens/Admin/Clinic/AdminClinicEditScreen";
import AdminClinicCreateScreen from "./screens/Admin/Clinic/AdminClinicCreateScreen";
import { useDispatch, useSelector } from "react-redux";
import { list_clinics } from "./actions/clinicActions";
import ClinicDetailScreen from "./screens/Clinic/ClinicDetailScreen";
import AdminEmployeeListScreen from "./screens/Admin/Employee/AdminEmployeeListScreen";
import BookingScreen from "./screens/Booking/BookingScreen";
import ProfileScreen from "./screens/Patient/ProfileScreen/ProfileScreen"
import DoctorDetailScreen from "./screens/DoctorDetailScreen/DoctorDetailScreen";
import AppointmentScreen from "./screens/AppointmentScreen/AppointmentScreen";
import AdminDoctorEditScreen from "./screens/Admin/Employee/AdminDoctorEditScreen";
import AdminTrainerEditScreen from "./screens/Admin/Employee/AdminTrainerEditScreen";
import AdminAppointmentListScreen from "./screens/Admin/Appointment/AdminAppointmentListScreen";
import AdminMachineListScreen from "./screens/Admin/Machine/AdminMachineListScreen";
import AdminExerciseListScreen from "./screens/Admin/Excercise/AdminExerciseListScreen";
import AdminMedicineListScreen from "./screens/Admin/Medicine/AdminMedicineListScreen";
import DoctorDashboard from "./screens/Doctor/DoctorDashboard";
import PatientBookScreen from "./screens/Booking/PatientBook/PatientBookScreen";
import ChooseAdvice from "./screens/Booking/PatientBook/FirstTimeAppointment/ChooseAdvice";
import ClinicKnownScreen from "./screens/Booking/PatientBook/FirstTimeAppointment/ClinicKnown/ClinicKnownScreen";
import DoctorChatScreen from "./screens/Chat/DoctorChatScreen";
import PatientChatScreen from "./screens/Chat/PatientChatScreen";
import PatientDashboard from "./screens/Doctor/PatientDashboard";
import DoctorWaitlist from "./screens/Doctor/Appointment";
import WaitingList from "./screens/Trainer/WaitingListScreen";
import { PhysiotherapyScreen } from "./screens/Booking/PatientBook/RemedicalAppointment/Physiotherapy/PhysiotherapyScreen";
import WaitingListScreen from "./screens/Receptionist/WaitingListScreen";
import PhyAppointmentScreen from "./screens/AppointmentScreen/PhyAppointmentScreen";
import { TrainingHistoryScreen } from "./screens/Patient/ProfileScreen/TrainingHistoryScreen";


function App() {
  const dispatch = useDispatch();
  const clinicList = useSelector((state) => state.clinicList);
  const { loading, error, clinics } = clinicList;
  useEffect(() => {
    dispatch(list_clinics());
  }, [dispatch]);
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route path='*' element={<NotFoundScreen />}></Route>
            <Route index element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />}></Route>
            <Route path='/register' element={<RegisterScreen />}></Route>
            <Route
              path='/activation-email'
              element={<ActivationEmailSceen />}
            ></Route>
            <Route
              path='/auth/activate/:id'
              element={<ActivateAccountScreen />}
            ></Route>
            <Route
              path='/admin/user_list'
              element={<AdminUserListScreen />}
            ></Route>
            <Route
              path='/admin/user/:id/edit'
              element={<AdminUserEditScreen />}
            ></Route>
            <Route
              path='/admin/user/create'
              element={<AdminUserCreateScreen />}
            ></Route>
            <Route
              path='/admin/clinic_list'
              element={<AdminClinicListScreen />}
            ></Route>
            <Route
              path='/admin/clinic/:id/edit'
              element={<AdminClinicEditScreen />}
            ></Route>
            <Route
              path='/admin/clinic/create'
              element={<AdminClinicCreateScreen />}
            ></Route>
            <Route
              path='/admin/employee_list'
              element={<AdminEmployeeListScreen />}
            ></Route>
            <Route
              path='/admin/doctor/:id/edit'
              element={<AdminDoctorEditScreen />}
            ></Route>
            <Route
              path='/admin/trainer/:id/edit'
              element={<AdminTrainerEditScreen />}
            ></Route>
            <Route
              path='/admin/appointment_list'
              element={<AdminAppointmentListScreen />}
            ></Route>
            <Route
              path='/admin/machine_list'
              element={<AdminMachineListScreen />}
            ></Route>
            <Route
              path='/admin/exercise_list'
              element={<AdminExerciseListScreen />}
            ></Route>
            <Route
              path='/admin/medicine_list'
              element={<AdminMedicineListScreen />}
            ></Route>
            <Route
              path='/appointment/:id'
              element={<AppointmentScreen />}
            ></Route>
            <Route
              path='/phyapp/:id'
              element={<PhyAppointmentScreen />}
            ></Route>
            <Route
              path='/phyrecord/:id'
              element={<TrainingHistoryScreen />}
            />
            <Route
              path='/booking/:id'
              element={<BookingScreen />}
            ></Route>
            <Route path='/services' element={<ServiceScreen />}></Route>
            <Route path='/profile' element={<ProfileScreen />}></Route>
            <Route path='/doctor/waitlist' element={<DoctorWaitlist />} />
            <Route
              path='/doctor/:id'
              element={<DoctorDetailScreen />}
            ></Route>
            <Route path='/doctor/chat' element={<DoctorChatScreen />}></Route>
            <Route
              path='/doctor_dashboard/:id'
              element={<DoctorDashboard />}
            ></Route>
            <Route path='/patient/chat' element={<PatientChatScreen />}></Route>
            <Route path='/makeanappointment' element={<PatientBookScreen />} />
            <Route path='/makeanappointment/firsttime' element={<ChooseAdvice />} />
            <Route path='/makeanappointment/firsttime/clinic' element={<ClinicKnownScreen />} />
            <Route path='/book/remedical/training' element={<PhysiotherapyScreen />} />
            <Route path='/patient/dashboard/:id' element={<PatientDashboard />} />
            <Route path='/trainer/waitlist' element={<WaitingList />} />
            <Route path='/receptionist/waitlist' element={<WaitingListScreen />} />
            {clinics
              ? clinics.map((clinic, index) => (
                <Route
                  path={`/services/${clinic.link}`}
                  element={<ClinicDetailScreen clinic={clinic} />}
                  key={index}
                />
              ))
              : null}
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
library.add(fas);
