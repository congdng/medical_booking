import React, { useState } from 'react'
import Datepicker from '../../../../../pieces/Datepicker/Datepicker'
import { renderDate } from '../../../../../function/webFunction'
import { HourOptions } from '../../../../../components/BookingContainer/BookingOptions'
import Button from '../../../../../pieces/Button/Button'
const ClinicDoctorHour = ({ nextStep, doctorInfo, setDateString, hour, setHour }) => {
  const workingHoursSample = ["07:00 - 07:30", "07:30 - 08:00", "08:30 - 09:00", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "13:30 - 14:00", "14:00 - 14:30"]
  const [date, setDate] = useState();
  const [sessions, setSessions] = useState()
  let grouppedHours
  const groupWorkingHours = () => {
    const grouppedHours = {}
    doctorInfo.workingHours.forEach(session => {
      if (!grouppedHours[session.date]) {
        grouppedHours[session.date] = []
      }
      grouppedHours[session.date].push(session.period)
    })
    return grouppedHours
  }
  if (doctorInfo.workingHours) {
    grouppedHours = groupWorkingHours()
  }
  console.log(grouppedHours)
  const onChangeDate = (date) => {
    setDate(date)
    const dateString = renderDate(date)
    console.log(dateString)
    if (!grouppedHours|| !grouppedHours[dateString]) {
      setSessions(workingHoursSample)
    } else {
      setSessions(grouppedHours[dateString])
    }
    setDateString(dateString)

  }
  return (
    <div className='flex flex-col gap-3'>Choose the time:
      <Datepicker date={date} setDate={onChangeDate} />
      {sessions && <HourOptions sessions={sessions} setHour={(session) => {
        setHour(session)
      }} />}
      {hour !== "" && <Button clickEvent={() => nextStep()}>Next</Button>}
    </div>
  )
}

export default ClinicDoctorHour