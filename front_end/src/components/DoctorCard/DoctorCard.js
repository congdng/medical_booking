import React, { useEffect, useState } from "react";
import Button from "../../pieces/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import moment from "moment";

const DoctorCard = ({ doctor }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const history = useNavigate();
  let options = [];
  for (let i = 0; i < 7; i++) {
    let object = {};
    object.label = moment(new Date())
      .add(i, "days")
      .locale("en")
      .format("ddd - DD/MM");
    object.value = moment(new Date())
      .add(i, "days")
      .locale("en")
      .startOf("day")
      .valueOf();
    options.push(object);
  }
  const convertTime = (date) => {
    const convertDate = new Date(date);
    return convertDate.toLocaleDateString("en-US");
  };
  const submitHandler = () => {
    console.log(time, convertTime(date.value));
    history(
      `/booking/${doctor._id}?period=${time}&date=${convertTime(date.value)}`
    );
  };
  return (
    <div className='grid grid-cols-6 gap-4 h-full py-5 bg-white p-4 rounded'>
      <div className='col-span-1 flex flex-col items-center gap-2'>
        <img
          src={doctor.imageLink}
          alt='Avatar'
          className='rounded-full aspect-square'
        />
        <Button
          type='secondary'
          size='small'
          clickEvent={() => history(`/doctor/${doctor._id}`)}
        >
          See More
        </Button>
      </div>
      <div className='flex flex-col items-start col-span-2 gap-5 divide-y-2'>
        <span className='text-websecondary font-medium text-xl'>
          {`Doctor ${doctor.user[0].name}`}
        </span>
        <div className='flex flex-col gap-2'>
          <span className='text-websecondary font-medium'>Language</span>
          <span>{doctor.language}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-websecondary font-medium'>Qualifications</span>
          <span>
            {doctor?.degree
              ? doctor?.degree
              : "EMedical Doctor, Hanoi Medical University (Highest ranking graduation"}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-websecondary font-medium'>Experience</span>
          <span>{doctor.experience}</span>
        </div>
      </div>
      <div className='flex flex-col gap-5 col-span-3'>
        <div className='w-1/3'>
          <Select options={options} defaultValue={date} onChange={setDate} />
        </div>
        <div className='flex gap-2 items-center'>
          <FontAwesomeIcon icon='fa-solid fa-calendar' />
          <span className='font-medium'>CALENDAR</span>
        </div>
        <div>
          {doctor.workingHours ? (
            <div className='grid grid-cols-4 gap-2'>
              {doctor.workingHours.map((time, index) => (
                <div
                  key={index}
                  className='p-4 bg-gray-300 rounded hover:border-websecondary hover:border-2 text-center'
                >
                  <span
                    className='font-medium'
                    onClick={(e) => {
                      setTime(e.target.textContent);
                    }}
                  >
                    {time.period}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span>This doctor is currently unavailable</span>
          )}
        </div>
        <span>
          Current Booking Time : {time} -{" "}
          {date?.value ? convertTime(date.value) : null}
        </span>
        <Button clickEvent={submitHandler}>Submit</Button>
      </div>
    </div>
  );
};

export default DoctorCard;
