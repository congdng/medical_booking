import React, { useState } from "react";
import Button from "../../pieces/Button/Button.js";
import RegisterProcess from "../../components/register_process/RegisterProcess.js";
import Input from "../../pieces/Input/Input.js";
import { checkNull, checkPhoneNumber } from "../../function/validateFunction";

const ContactInformation = (props) => {
  const [phoneNumberError, setPhoneNumberError] = useState([]);
  const [addressError, setAddressError] = useState([]);
  const disable =
    phoneNumberError.length !== 0 ||
    addressError.length !== 0 ||
    props.phoneNumber === "" ||
    props.address === "";

  const addressValidate = (currentAddress) => {
    const errors = [];
    if (!checkNull(currentAddress)) {
      errors.push("Address must be filled");
    }
    setAddressError(errors);
  };
  const phoneNumberValidate = (currentPhoneNumber) => {
    const errors = [];
    if (!checkNull(currentPhoneNumber)) {
      errors.push("Phone number must be filled");
    } else {
      if (!checkPhoneNumber(currentPhoneNumber)) {
        errors.push("Phone number must begin with 0 and contain 10 numbers");
      }
    }
    setPhoneNumberError(errors);
  };
  return (
    <div className='flex flex-col justify-between h-full p-10'>
      <div className='flex flex-col items-center justify-center text-center gap-3'>
        <h2 className='text-2xl font-bold'>What's your name?</h2>
        <span className='text-webgrey'>Don't worry we won't tell anyone.</span>
        <div>
          <RegisterProcess totalTabs='5' activeIndex='3' />
        </div>
        <Input
          text='Your Phone Number'
          id='phoneNumber'
          state={props.phoneNumber}
          placeholder='0936071685'
          setState={props.setPhoneNumber}
          stateError={phoneNumberError}
          validate={phoneNumberValidate}
        />
        <Input
          text='Your Address'
          id='address'
          state={props.address}
          placeholder='11 Nguyen Trai, Quarter 1, Ho Chi Minh City'
          setState={props.setAddress}
          stateError={addressError}
          validate={addressValidate}
        />
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
};

export default ContactInformation;
