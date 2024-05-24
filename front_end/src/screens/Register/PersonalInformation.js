import React, { useState } from 'react'
import Input from '../../pieces/Input/Input.js';
import Button from '../../pieces/Button/Button.js';
import { checkDOB, checkNull } from '../../function/validateFunction';
import RegisterProcess from '../../components/register_process/RegisterProcess.js';

const PersonalInformation = (props) => {
    const [nameError, setNameError] = useState([]);
    const [genderError, setGenderError] = useState([]);
    const [dobError, setDOBError] = useState([]);
    const [ethnicError, setEthnicError] = useState([]);
    const [nationalityError, setNationalityError] = useState([]);
  
    const disable =
      nameError.length !== 0 ||
      genderError.length !== 0 ||
      dobError.length !== 0 ||
      ethnicError.length !== 0 ||
      nationalityError.length !== 0 ||
      props.name === "" ||
      props.gender === "" ||
      props.dob === "" ||
      props.ethnic === "" ||
      props.nationality === "";
  
    const nameValidate = (currentName) => {
      const errors = [];
      if (!checkNull(currentName)) {
        errors.push("Name must be filled");
      }
      setNameError(errors);
    };
    const genderValidate = (currentGender) => {
      const errors = [];
      if (!checkNull(currentGender)) {
        errors.push("Gender must be selected");
      }
      setGenderError(errors);
    };
    const dobValidate = (currentDOB) => {
      const errors = [];
      if (!checkNull(currentDOB)) {
        errors.push("Date of Birth must be filled");
      } else {
        if (!checkDOB(currentDOB)) {
          errors.push("Date of Birth must be in format dd-mm-yyyy");
        }
      }
      setDOBError(errors);
    };
    const ethnicValidate = (currentEthnic) => {
      const errors = [];
      if (!checkNull(currentEthnic)) {
        errors.push("Ethnic must be filled");
      }
      setEthnicError(errors);
    };
  
    const nationalityValidate = (currentNationality) => {
      const errors = [];
      if (!checkNull(currentNationality)) {
        errors.push("Nationality must be filled");
      }
      setNationalityError(errors);
    };
    return (
      <div className='flex flex-col justify-between h-full p-10'>
        <div className='flex flex-col items-center justify-center text-center gap-3'>
          <h2 className='text-2xl font-bold'>What's your name?</h2>
          <span className='text-webgrey'>Don't worry we won't tell anyone.</span>
          <div>
            <RegisterProcess totalTabs='5' activeIndex='2' />
          </div>
          <Input
            text='Your Name'
            id='name'
            state={props.name}
            placeholder='Banh Quang Long'
            setState={props.setName}
            stateError={nameError}
            validate={nameValidate}
          />
          <div className='flex items-start gap-2 w-full'>
            <div className='w-1/3'>
              <label htmlFor='gender' className='block mb-2 text-sm font-medium'>
                Your Gender
              </label>
              <select
                id='gender'
                value={props.gender}
                onChange={(e) => {
                  let currentValue = e.target.value;
                  props.setGender(currentValue);
                  genderValidate(currentValue);
                }}
                className={
                  !genderError.length
                    ? "border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5"
                    : "border border-webgrey block w-full p-2.5 text-sm rounded-lg bg-red-100 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                }
              >
                <option value='' disabled>
                  Select
                </option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
              {!genderError.length ? (
                <></>
              ) : (
                <div className='flex gap-4'>
                  {genderError.map((error, index) => {
                    return (
                      <span key={index} className='mt-1 text-xs text-red-600'>
                        {error}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <div className='w-2/3 flex-grow'>
              <Input
                text='Your Date of Birth'
                id='dob'
                state={props.dob}
                placeholder='21-05-2000'
                setState={props.setDOB}
                stateError={dobError}
                validate={dobValidate}
              />
            </div>
          </div>
          <div className='flex items-start gap-2 w-full'>
            <div className='w-1/2'>
              <Input
                text='Your Ethnic'
                id='ethnic'
                state={props.ethnic}
                placeholder='Kinh'
                setState={props.setEthnic}
                stateError={ethnicError}
                validate={ethnicValidate}
              />
            </div>
            <div className='w-1/2'>
              <Input
                text='Your Nationality'
                id='nationality'
                state={props.nationality}
                placeholder='Viet Nam'
                setState={props.setNationality}
                stateError={nationalityError}
                validate={nationalityValidate}
              />
            </div>
          </div>
        </div>
        <div className='flex gap-3 w-full'>
          <Button
            clickEvent={props.backPage}
            onlyIcon='fa-solid fa-arrow-left'
            className='w-1/2'
          />
          <Button
            clickEvent={props.nextPage}
            onlyIcon='fa-solid fa-arrow-right'
            disabled={disable}
            className='w-1/2'
          />
        </div>
      </div>
    );
}

export default PersonalInformation
