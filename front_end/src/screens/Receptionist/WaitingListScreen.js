import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminAppointmentListScreen from '../Admin/Appointment/AdminAppointmentListScreen';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../actions/userActions';
import AdminPhyAppointmentListScreen from '../Admin/Appointment/AdminPhyAppointmentListScreen';

const WaitingListScreen = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const history = useNavigate();

    const [menu, setMenu] = useState("doctor");

    useEffect(()=>{
        if (!(userInfo && userInfo.role ==="receptionist")){
            history("/")
        } 
    },[])
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout());
      };
  return (
    <div className='grid w-full'>
      <div className='min-h-[70vh] m-10 flex'>
        <div className='w-1/4'>
          <ul>
            <li
              className={`text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${
                menu === "doctor"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
              }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("doctor");
                }}
              >
                <FontAwesomeIcon icon={"fas-regular fa-user"}></FontAwesomeIcon>
                <span>Doctor Appointments</span>
              </div>
            </li>
            <li
              className={`text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary ${
                menu === "trainer"
                  ? "text-white bg-websecondary"
                  : "bg-webwhite text-websecondary"
              }`}
            >
              <div
                className='flex items-center gap-2 justify-start'
                onClick={() => {
                  setMenu("trainer");
                }}
              >
                <FontAwesomeIcon icon={"fa-solid fa-calendar-check"} />
                <span>Physiotherapy Sessions</span>
              </div>
            </li>
            <li
              className={` text-center w-3/4  rounded-lg border-2 border-websecondary px-3 py-6 text-lg font-medium mb-3 cursor-pointer text-websecondary `}
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
                <div className='w-full'>
                    {menu === 'doctor' && <AdminAppointmentListScreen/>}
                    {menu === 'trainer' && <AdminPhyAppointmentListScreen/>}
                </div>
        </div>
        </div>
  )
}

export default WaitingListScreen