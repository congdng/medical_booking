import React from "react"
import { BookingOptions } from "../../../../components/BookingContainer/BookingOptions"
const ChooseAdvice = () => {
    const options = [
      { name: "I have known the clinic", link: "/makeanappointment/firsttime/clinic" },
      { name: "I need more advice", link: "/book/firsttime/appointment/symptoms" }
    ]
    return (
      <div><BookingOptions options={options} /></div>
    )
  }
export default ChooseAdvice