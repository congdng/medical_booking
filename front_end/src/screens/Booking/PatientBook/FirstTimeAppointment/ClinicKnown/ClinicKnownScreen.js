import React, { useState } from 'react'
import Clinic from './Clinic'
import ClinicDoctor from './ClinicDoctor'
import ClinicDoctorHour from './ClinicDoctorHour'
import ConfirmScreen from '../../ConfirmScreen.js'
import Symptoms from '../ClinicNotKnown/Symptoms.js'
import Complete from '../../Complete.js'
const ClinicKnownScreen = () => {
  const [step, setStep] = useState(0)
  const [clinicId, setClinicId] = useState("")
  const [doctorInfo, setDoctorInfo] = useState()
  const [date, setDate] = useState()
  const [hour, setHour] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const nextStep = () => {
    setStep(step + 1)
  }
  const stepList = [
    <Clinic nextStep={nextStep} setClinicId={setClinicId} />,
    <ClinicDoctor nextStep={nextStep} clinicId={clinicId} setDoctorInfo={setDoctorInfo} />,
    <ClinicDoctorHour nextStep={nextStep} doctorInfo={doctorInfo}
      setDateString={setDate}
      hour={hour} setHour={setHour} />,
    <Symptoms nextStep={nextStep} setSymptoms={setSymptoms} symptoms={symptoms} />,
    <ConfirmScreen data={{
      type: 'appointment',
      symptoms: symptoms,
      session: {date,hour},
      doctor: doctorInfo
    }} nextStep={nextStep} />,
    <Complete />
  ]


  return (
    <div className="flex justify-center mx-auto">{stepList[step]}</div>
  )
}

export default ClinicKnownScreen