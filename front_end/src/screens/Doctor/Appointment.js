import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from '../../pieces/Loader/Loader';
import Message from '../../pieces/Message/Message';
import { getDoctorAppointment } from '../../actions/userActions';
import Button from '../../pieces/Button/Button';
import { StringToDate } from '../../function/webFunction';


const sortAppointmentsByDate = (appointments) => {
  return appointments.sort((a, b) => StringToDate(a.date) - StringToDate(b.date));
};
const groupAppointmentsByDate = (appointments) => {
  const grouppedAppointments = {}
  appointments.forEach(app => {
    if (!grouppedAppointments[app.date]) {
      grouppedAppointments[app.date] = []
      grouppedAppointments[app.date].push(app)
    }
    else {
      grouppedAppointments[app.date].push(app)
    }
  })
  return grouppedAppointments

}
const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const DoctorWaitlist = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDoctorAppointment())
  }, [dispatch])
  const { appointments, loading, error } = useSelector((state) => state.appointmentList)
  const appointmentAfterSort = appointments?.length > 0 ? sortAppointmentsByDate(appointments) : []
  const appointmentAfterGroup = appointmentAfterSort.length > 0 ? groupAppointmentsByDate(appointmentAfterSort) : []
console.log(appointments?.length)
console.log(appointmentAfterGroup)
  return (
    <>{(loading || appointmentAfterGroup.length === 0) ? (
      <Loader />
    ) : (error) ? (
      <Message>{error}</Message>
    ) : (
      <div className='bg-white p-4 mb-[40px] rounded-lg shadow-sm text-[12px] grow'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex gap-4 bg-webthird rounded-[32px] items-center'>
            <span className=' p-2 rounded-[24px] inline-block text-webwhite bg-webprimary'>
              Upcoming Appointments
            </span>
            <span className='pr-4'>Post Appointments</span>
          </div>
          <div className='flex text-[16px] text-websecondary'>
            <FontAwesomeIcon icon='fa-solid fa-file-arrow-up' />
            <span>Add Appointment</span>
          </div>
        </div>

        
        <div>
          {appointments.length === 1 &&
            <>
              <div className='grid grid-cols-[1fr_6fr] items-center'>
               
                <div className='flex flex-col'>
                  <span className='text-[16px] font-bold'>{StringToDate(appointments[0].date).getDate() + "/" + (StringToDate(appointments[0].date).getMonth() + 1)}</span>
                  <span className='text-webgrey opacity-50'>{weekDay[StringToDate(appointments[0].date).getDay()]}</span>
                </div>
                <div className='bg-blue-200 bg-opacity-30 p-4 flex flex-col gap-2'>

                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>Session</span>
                      <span>{appointments[0].session}</span>
                    </div>
                    <div className='flex flex-col max-w-2'>
                      <span className='text-webgrey opacity-50'>
                        Name
                      </span>
                      <span className='text-wrap'>{appointments[0].patient_id.name}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>
                        Clinic
                      </span>
                      <span>{appointments[0].clinic_id.name}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>Doctor</span>
                      <span>Dr. {appointments[0].doctor_id.user_id.name}</span>
                    </div>
                    <span className='w-20 text-green-900 bg-green-500 bg-opacity-50 p-2 rounded-[36px]'>
                      Confirmed
                    </span>
                    <Button size='small' clickEvent={() => {
                      window.location.href = `/patient/dashboard/${appointments[0].patient_id._id}`;
                    }} >Dashboard</Button>
                    <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                  </div>      
              </div>
            </div>
            </>}
                
          {appointments.length > 1 && Object.entries(appointmentAfterGroup).map(([key, value]) => (
            <div className='grid grid-cols-[1fr_6fr] items-center' key={key}>
              <div className='flex flex-col'>
                <span className='text-[16px] font-bold'>{StringToDate(key).getDate() + "/" + (StringToDate(key).getMonth() + 1)}</span>
                <span className='text-webgrey opacity-50'>{weekDay[StringToDate(key).getDay()]}</span>
              </div>
              <div className='bg-blue-200 bg-opacity-30 p-4 flex flex-col gap-2'>
                {value.length > 0 && value.map((app) => (
                  <div className='flex justify-between items-center' key={app._id}>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>Session</span>
                      <span>{app.session}</span>
                    </div>
                    <div className='flex flex-col max-w-2'>
                      <span className='text-webgrey opacity-50'>
                        Name
                      </span>
                      <span className='text-wrap'>{app.patient_id.name}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>
                        Clinic
                      </span>
                      <span>{app.clinic_id.name}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-webgrey opacity-50'>Doctor</span>
                      <span>Dr. {app.doctor_id.user_id.name}</span>
                    </div>
                    <span className='w-20 text-green-900 bg-green-500 bg-opacity-50 p-2 rounded-[36px]'>
                      Confirmed
                    </span>
                    <Button size='small' clickEvent={() => {
                      window.location.href = `/patient/dashboard/${app.patient_id._id}`;
                    }} >Dashboard</Button>
                    <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          
        </div>
      </div>
    )}</>
  )
}

export default DoctorWaitlist