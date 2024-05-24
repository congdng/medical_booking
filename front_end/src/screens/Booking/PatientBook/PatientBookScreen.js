import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_user_appointments } from '../../../actions/appointmentAction'
import Message from '../../../pieces/Message/Message'
import FirstTimeScreen from './FirstTimeAppointment/FirstTimeScreen.js'

import Loader from '../../../pieces/Loader/Loader'
import RemedicalScreen from './RemedicalAppointment/RemedicalScreen.js'
const PatientBookScreen = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(list_user_appointments(userInfo._id))
  }, [dispatch])

  const { appointments, loading, error } = useSelector((state) => state.appointmentUser);
  console.log(appointments?.length)


  return (
    <div className='flex justify-center items-center mx-auto'>
      {
        loading ? <Loader /> :
          error ? <Message>{error}</Message> :
            (appointments?.length > 0 ? <RemedicalScreen /> : <FirstTimeScreen />)


      }
    </div>
  )
}

export default PatientBookScreen