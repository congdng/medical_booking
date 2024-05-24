import React from 'react'
import Button from '../../../pieces/Button/Button'
import {useNavigate} from 'react-router-dom'
const Complete = () => {
  const nav = useNavigate()
  return (
    <div className='flex justify-center items-center flex-col gap-10'>
    <h1 className='text-websecondary text-[70px] text-center select-none'>
      BOOKING COMPLETE
    </h1>
    <span>
     Your booking has been successfully saved.
    </span>
      <Button clickEvent={()=> nav("/")}>Home</Button>
  
  </div>
  )
}

export default Complete