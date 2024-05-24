import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Button from '../../pieces/Button/Button'
export const BookingOptions = ({ options }) => {
  return (<div className='flex flex-col justify-center items-center'>
    {options.map((option, index) =>
      <a key={index} className="bg-webwhite flex justify-between hover:bg-webprimary" style={{ 'width': '500px', 'padding': '10px', 'margin': '10px' }}
        href={option.link}>
        {option.name}
        <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
      </a>)}
  </div>)
}
export const ExerciseOptions = ({options, func}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (index) => {
    if (selectedOptions.includes(options[index])) {
      setSelectedOptions(prevOptions => prevOptions.filter(option => option !== options[index]));
    } else {
      setSelectedOptions(prevOptions => [...prevOptions, options[index]]);
    }
  }

  return (
    <div className=' flex flex-col justify-center items-center'>
      {options?.map((option, index) => (
        <div
          key={index}
          className={`hover:bg-blue-200 ${selectedOptions.includes(options[index])? 'bg-blue-200':'bg-webwhite'} flex justify-between`}
          style={{ 'width': '500px', 'padding': '10px', 'margin': '10px' }}
          onClick={() => handleOptionClick(index)}
        >
          <div className='text-wrap' style={{ 'width': '200px' }}>
            {option.exercise_id.name}
          </div>
         
        </div>


      ))}
       {selectedOptions.length>0 && (
            <Button clickEvent={(e) => func(e, selectedOptions)}>
              Book
            </Button>
          )}
    </div>

  )
  // return (<div className=' flex flex-col justify-center items-center'>
  //   {options?.map((option,index)=> <div className=' bg-webwhite flex justify-between' style={{ 'width': '500px', 'padding': '10px', 'margin': '10px' }}>
  //     <div key={index} className='text-wrap ' style={{ 'width': '200px' }}>
  //       {option.exercise_id.name}
  //     </div>
  //     <Button clickEvent={(e)=> func(e, option)}>
  //       Book
  //     </Button>
  //   </div>)}
  //   {/* <div className=' bg-webwhite flex justify-between' style={{ 'width': '500px', 'padding': '10px', 'margin': '10px' }}>
  //     <div className='text-wrap ' style={{ 'width': '200px' }}>
  //       ExerciseNameABCBCBCCCCCC CCCCCCCCCCCCCCC
  //     </div>
  //     <Button>
  //       Book
  //     </Button>
  //   </div>
  //   <div className=' bg-webwhite flex justify-between' style={{ 'width': '500px', 'padding': '10px', 'margin': '10px' }}>
  //     <div className='text-wrap ' style={{ 'width': '200px' }}>
  //       ExerciseNameABCBCBCCC CCCCCCCCCCCCCCCCCC
  //     </div>
  //     <Button>
  //       Book
  //     </Button>
  //   </div> */}

  // </div>)
}


export const HourOptions = ({ sessions, setHour = ()=>{} }) => {
  return (<div className='grid grid-cols-4 gap-4'>
    {sessions.map((session, index) =>
      <div key={index} onClick={()=>setHour(session)}
        className="p-4 bg-gray-300 rounded hover:border-websecondary hover:border-2 text-center">
        <span className="font-medium">{session}</span>
      </div>)}


  </div>)
}