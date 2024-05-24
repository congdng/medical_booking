import React, { useState } from 'react'
import Datepicker from '../../../../../pieces/Datepicker/Datepicker';
import { HourOptions } from '../../../../../components/BookingContainer/BookingOptions';
import { renderDate } from '../../../../../function/webFunction';
import Button from '../../../../../pieces/Button/Button';

export const ChooseHour = ({nextStep, setDateString, hour, setHour }) => {
  const workingHoursSample = ["07:00 - 07:30", "07:30 - 08:00", "08:30 - 09:00", "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", "13:30 - 14:00", "14:00 - 14:30"]
  const [date, setDate] = useState();
  const [sessions, setSessions] = useState()

  const onChangeDate = (date) => {
    setDate(date)
    const dateString = renderDate(date)
    // if (!grouppedHours[dateString]) {
    //   setSessions(workingHoursSample)
    // } else {
    //   setSessions(grouppedHours[dateString])
    // }
    setDateString(dateString)
    setSessions(workingHoursSample)

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
