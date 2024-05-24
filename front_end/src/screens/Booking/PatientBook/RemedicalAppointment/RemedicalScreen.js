import React from 'react'
import { BookingOptions } from '../../../../components/BookingContainer/BookingOptions'

const RemedicalScreen = () => {
  const options = [
    { name: "Book a remedical appointment", link: "/makeanappointment/remedical/" },
    { name: "Do a physical therapy session", link: "/book/remedical/training" }
  ]

  return (
    <div className='flex justify-center items-center'><BookingOptions options={options} /></div>
  )
}

export default RemedicalScreen