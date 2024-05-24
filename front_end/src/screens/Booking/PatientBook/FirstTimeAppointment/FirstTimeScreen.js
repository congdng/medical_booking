import React, { useState } from 'react'
import { BookingOptions } from '../../../../components/BookingContainer/BookingOptions'
const FirstTimeScreen = () => {
  const options = [
    { name: "Meet a doctor", link: "/makeanappointment/firsttime/" },
    { name: "Do a physical therapy session", link: "/book/firsttime/training" }
  ]

  return (
    <div><BookingOptions options={options} /></div>
  )
}


export default FirstTimeScreen