import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Message from "../../../pieces/Message/Message";
import Loader from "../../../pieces/Loader/Loader";
import Button from "../../../pieces/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get_user_detail, logout, updateUser } from "../../../actions/userActions";
import Input from "../../../pieces/Input/Input";
import PasswordInput from "../../../pieces/Input/PasswordInput";
import { list_user_appointments } from "../../../actions/appointmentAction";
import { get_phy_apppointment_patient } from "../../../actions/physicalAppAction";
import { exercise_record_list } from "../../../actions/ERAction";
import { TrainingGraphScreen } from "./TrainingGraphScreen";
import MedicineListScreen from "../MedicinePreScreen/MedicineListScreen";
const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState(null);
  const [menu, setMenu] = useState("account");
  const [editMenu, setEditMenu] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;
  const appointmentUser = useSelector((state) => state.appointmentUser);
  const {
    loading: loadingAppointment,
    error: errorAppointment,
    appointments,
  } = appointmentUser;

  const phyAppointmentList = useSelector((state) => state.physicaltherapyAppointmentList);
  const { loading: loadingPhyAppointment,
    error: errorPhyAppointment,
    appointments: phyAppointment
  } = phyAppointmentList;
  // console.log("LOADING", loadingPhyAppointment)
  // console.log("ERROR", errorPhyAppointment)
  // console.log("PHYAPP", phyAppointment)
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    } else {
      if (!user.name) {
        dispatch(get_user_detail(userInfo._id));
        dispatch(list_user_appointments(userInfo._id));
        dispatch(get_phy_apppointment_patient(userInfo._id))
        dispatch(exercise_record_list(userInfo._id))
      } else {
        setName(user.name);
        setEmail(user.email);
        setUserName(user.username);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    if (password !== confirmPassword) {
      setMessage("Password are not matched");
    } else {
      dispatch(updateUser({ id: user._id, userName, email, password }));
    }
  };
  return (
    <div className='grid w-full'>
      <div className='min-h-[70vh] m-10 flex'>
        <div className='w-1/4'>
          <ul>
            <li
              className={`text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "account"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("account");
                }}
              >
                <FontAwesomeIcon icon={"fas-regular fa-user"}></FontAwesomeIcon>
                <span>Account details</span>
              </div>
            </li>
            <li
              className={`text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "appointment"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("appointment");
                  setEditMenu(false);
                }}
              >
                <FontAwesomeIcon icon={"fa-solid fa-calendar-check"} />
                <span>Appointments</span>
              </div>
            </li>
            <li
              className={` text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "treatment"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("treatment");
                  setEditMenu(false);
                }}
              >
                <FontAwesomeIcon icon={"fa-solid fa-cookie-bite"} />
                <span>Treatment</span>
              </div>
            </li>
            <li
              className={` text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "machines"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("medicines");
                  setEditMenu(false);
                }}
              >
                <FontAwesomeIcon icon={"fa-solid fa-cookie-bite"} />
                <span>Prescription</span>
              </div>
            </li>
            <li
              className={` text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "progress"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("progress");
                  setEditMenu(false);
                }}
              >
                <FontAwesomeIcon icon='fa-solid fa-comment' />
                <span>Progress</span>
              </div>
            </li>
            <li
              className={` text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${menu === "treatment"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
                }`}
            >
              <div
                className='lex items-center gap-2 justify-start'
                onClick={logoutHandler}
              >
                <FontAwesomeIcon icon='fa-solid fa-right-from-bracket' />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </div>
        <div className='w-3/4'>
          {menu === "account" ? (
            <div>
              <div className='mb-4 border-b-2 border-websecondary flex justify-between items-center'>
                <h2 className='px-8 text-lg text-websecondary'>Your Profile</h2>
                <Button
                  clickEvent={() => {
                    setEditMenu(!editMenu);
                  }}
                >
                  Edit Profile
                </Button>
              </div>
              <div className='flex items-center mt-5 w-full'>
                <div className='w-1/12'>
                  <img
                    src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
                    alt='avatar'
                    className='w-1/2 rounded-full aspect-square'
                  />
                </div>
                <div className='w-1/4 flex flex-col gap-2'>
                  <span className='text-websecondary font-medium'>Name</span>
                  <span>{user.name}</span>
                </div>
                <div className='w-1/4 flex flex-col gap-2'>
                  <span className='text-websecondary font-medium'>
                    Username
                  </span>
                  <span>{user.name}</span>
                </div>
                <div className='w-1/4 flex flex-col gap-2'>
                  <span className='text-websecondary font-medium'>Email</span>
                  <span>{user.email}</span>
                </div>
                {/* <div className='section--item w-1/6 d-flex justify-content-end'>
                  <Button clickEvent={() => setEditMenu(!editMenu)}>
                    Change Pass.
                  </Button>
                </div> */}
              </div>
            </div>
          ) : (
            ""
          )}
          {editMenu === true ? (
            <div className='border-t-2 mt-5 border-websecondary'>
              <span className='text-lg text-websecondary'>
                Update your profile
              </span>
              {message && <Message>{message}</Message>}
              {error && <Message>{error}</Message>}
              {/* {success && (
                                <Message variant="success">
                                    'Profile Updated'
                                </Message>
                            )} */}
              {loading && <Loader />}
              <div className='mt-4'>
                <Input
                  text='Your Username'
                  id='username'
                  state={userName}
                  setState={setUserName}
                />
                <Input
                  text='Your Email'
                  id='email'
                  state={email}
                  setState={setEmail}
                />
                <PasswordInput
                  text='Your Password'
                  id='password'
                  state={password}
                  setState={setPassword}
                />
                <Input
                  text='Confirm Your Password'
                  id='confirmPassword'
                  state={confirmPassword}
                  setState={setConfirmPassword}
                />
                <Button clickEvent={submitHandler}>
                  Update my information
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
          {menu === "appointment" ? (
            <>
              <h2 className='text-websecondary font-medium text-lg'>
                My Appointment List
              </h2>
              {loadingAppointment ? (
                <Loader />
              ) : errorAppointment ? (
                <Message>{errorAppointment}</Message>
              ) : (
                <>
                  <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-5'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                      <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                        <tr>
                          <th scope='col' className='px-6 py-3'>
                            ID
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Patient
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Doctor
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Department
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Time
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            Paid
                          </th>
                          <th scope='col' className='px-6 py-3'>
                            <span className='sr-only'>Navigate</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments
                          ? appointments.map((appointment) => (
                            <tr
                              className='bg-white border-b'
                              key={appointment._id}
                            >
                              <th
                                scope='row'
                                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                              >
                                {appointment._id}
                              </th>
                              <td className='px-6 py-4'>
                                {appointment.name ||
                                  appointment.patient_id.name}
                              </td>
                              <td className='px-6 py-4'>
                                {appointment.doctor_id.user_id.name}
                              </td>
                              <td className='px-6 py-4'>
                                {appointment.clinic_id.name}
                              </td>
                              <td className='px-6 py-4'>{`${appointment.date} ${appointment.session}`}</td>
                              <td className='px-6 py-4'>
                                {appointment.isPaid ? (
                                  <FontAwesomeIcon
                                    icon={"fa-solid fa-check"}
                                    className='text-green-600'
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={"fa-solid fa-x"}
                                    className='text-red-500'
                                  />
                                )}
                              </td>
                              <td className='px-6 py-4 '>
                                <Link to={`/appointment/${appointment._id}`}>
                                  <Button size='small'>View</Button>
                                </Link>
                              </td>
                            </tr>
                          ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          ) : null}
          {menu === "medicines" && (
            <>
              <h2 className='text-websecondary font-medium text-lg'>
                My Prescription List
              </h2>
              <MedicineListScreen/>
            </>
          )}
          {menu === "treatment" && (<>
            <h2 className='text-websecondary font-medium text-lg'>
              My Physical Therapy Appointment List
            </h2>
            {loadingPhyAppointment ? <Loader /> :
              errorPhyAppointment ? <Message>{errorPhyAppointment}</Message> : <>

                <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-5'>
                  <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Trainer
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Time
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Paid
                        </th>
                        <th scope='col' className='px-6 py-3'>

                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Training Status
                        </th>

                      </tr>
                    </thead>
                    {phyAppointment && <tbody>
                      {phyAppointment.map(app => <tr
                        className='bg-white border-b'
                        key={app._id}>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                        >
                          {app._id}
                        </th>

                        <td> {app.trainer_id.name}</td>
                        <td> {app.date} <br /> {app.session} </td>
                        <td className='px-6 py-4'>
                          {app.isPaid ? (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-check"}
                              className='text-green-600'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-x"}
                              className='text-red-500'
                            />
                          )}
                        </td>
                        <td className='px-6 py-4 '>
                          <Link to={`/phyapp/${app._id}`}>
                            <Button size='small'>{app.isPaid ? 'View payment' : 'Pay'}</Button>
                          </Link>
                        </td>
                        <td className='px-6 py-4 '>
                          <div className='flex flex-col'>
                            {app.isPaid && (<>
                              {app.exercise_status}
                            </>)}
                            {app.exercise_status === "done" ?
                              <Link to={`/phyrecord/${app._id}`}>
                              <Button size='small'>View record</Button>
                              </Link> : <></>}
                          </div>
                        </td>
                      </tr>)}
                    </tbody>}
                  </table>
                </div>
              </>}
          </>)}
          {menu ==="progress" && <TrainingGraphScreen/>}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
