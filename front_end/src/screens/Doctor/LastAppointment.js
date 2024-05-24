import React, { useState, useEffect } from "react";
// import Input from "../../pieces/Input/Input";
// import { useDispatch, useSelector } from "react-redux"
// import Loader from "../../pieces/Loader/Loader";
// import Message from "../../pieces/Message/Message";

function LastAppointment() {
  return (
    <div>
        <span className='block font-semibold text-2xl text-websecondary'>
          Last Appointment Result
        </span>
        <div className='last:mb-4 mt-4 gap-2 flex flex-col'>
          <div className='flex gap-4'>
            <div className='w-1/4 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Blood type
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                O+
              </span>
            </div>
            <div className='w-1/4 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Weight
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                50kg
              </span>
            </div>
            <div className='w-1/4 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Height
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                160cm
              </span>
            </div>
            <div className='w-1/4 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Blood pressure
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                160cc
              </span>
            </div>
          </div>
          <div className='w-full flex items-center text-center'>
            <label htmlFor='name' className='mr-2 font-semibold'>
              Date of appointment
            </label>
            <span
              id='name'
              className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
            >
              20/03/2024
            </span>
          </div>
          <div className='w-full flex items-center text-center'>
            <label htmlFor='name' className='mr-2 font-semibold'>
              Symptoms
            </label>
            <span
              id='name'
              className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2 readonly'
            >
              {`Pain or tenderness in the wrist, hand, or arm. Swelling in the affected area. Difficulty moving the wrist, hand, or arm. A noticeable lump or deformity in the arm bone. In severe cases, numbness or tingling in the hand or arm.`}
            </span>
          </div>
          <div className='w-full flex items-center text-center'>
            <label htmlFor='name' className='mr-2 font-semibold'>
              Diagnosis
            </label>
            <span
              id='name'
              className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2 readonly text-left'
            >
              {`Arm break diagnosis typically involves a thorough evaluation by a healthcare professional, who will consider factors such as physical signs, X-ray results, and the need for additional imaging tests like MRIs or CT scans. Once the diagnosis is confirmed, your healthcare professional will provide you with a tailored treatment plan based on your specific needs and circumstances. `}
            </span>
          </div>
        </div>
      </div>
  )
}

export default LastAppointment