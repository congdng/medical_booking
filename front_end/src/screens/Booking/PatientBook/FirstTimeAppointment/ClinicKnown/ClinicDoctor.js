import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_doctors } from '../../../../../actions/userActions'
import Loader from '../../../../../pieces/Loader/Loader'
import Message from '../../../../../pieces/Message/Message'
import Button from '../../../../../pieces/Button/Button'

const ClinicDoctor = ({nextStep, clinicId, setDoctorInfo }) => {
  const dispatch = useDispatch()
  const department = clinicId
  useEffect(() => {
    dispatch(list_doctors(department))
  }, [])

  const doctorList = useSelector((state) => state.doctorList)
  const { doctors, error, loading } = doctorList

  return (
    <div>
      {loading ? <Loader /> : error ? <Message>{error}</Message> :
        <>
          Choose doctor:
          <div className='bg-blue-200 flex justify-center '>
            <>{doctors.map((doctor, index) => {
              const user = doctor.user
              return <div key={doctor._id} onClick={()=>{
                  setDoctorInfo(doctor)
                  console.log(doctor)
                  nextStep()
              }}
                className='bg-webwhite flex flex-col justify-center items-center shadow-lg'
                style={{ 'width': '150px', 'height': '250px', 'padding': '10px', 'margin': '10px',  }}>
                <img src={doctor.imageLink} /> {user[0].name}</div>
            })}</>
          </div>
        </>}</div>
  )
}

export default ClinicDoctor