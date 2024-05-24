import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_clinics } from '../../../../../actions/clinicActions'
import Message from '../../../../../pieces/Message/Message'
import Button from '../../../../../pieces/Button/Button'
import Loader from '../../../../../pieces/Loader/Loader'

const Clinic = ({ nextStep, setClinicId }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(list_clinics())
  }, [])
  const clinicList = useSelector((state) => state.clinicList);
  const { loading, error, clinics } = clinicList;
  console.log(clinics)
  return (
    <div>{loading ? <Loader /> : error ? <Message>{error}</Message> :
      <div>
        Choose clinic:
        <div className="grid grid-cols-4">
          {clinics?.map((clinic, index) => <Button key={index} clickEvent={() => {
            setClinicId(clinic._id)
            nextStep()
          }}>{clinic.name}</Button>)}
        </div></div>}</div>
  )
}

export default Clinic