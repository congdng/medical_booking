import React, { useState } from "react";
import Button from "../../pieces/Button/Button.js";
import RegisterProcess from "../../components/register_process/RegisterProcess.js";
import Input from "../../pieces/Input/Input.js";
import PasswordInput from "../../pieces/Input/PasswordInput.js"

import {
  checkNoSpace,
  checkNull,
  checkNumber,
  checkPasswordList,
  checkSpecial,
  checkTextRange,
  checkUppercase,
} from "../../function/validateFunction";

const Password = (props) => {
  const initialState = {
    null: true,
    uppercase: true,
    number: true,
    specialCharacter: true,
    length: true,
    common: true,
    space: true,
  };
  const [passwordError, setPasswordError] = useState(initialState);
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState([
    "Confirm password is empty",
  ]);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const showPassword = () => {
    setPasswordShow(!passwordShow);
    setConfirmPasswordShow(!confirmPasswordShow);
  };
  const passwordValidate = (currentPassword) => {
    // let errors = { ...initialState };
    let errors = {};
    if (!checkNull(currentPassword)) {
      errors = { ...errors, null: true };
    } else {
      if (!checkTextRange(currentPassword, 6, 100)) {
        errors = { ...errors, length: true };
      }
      if (!checkUppercase(currentPassword)) {
        errors = { ...errors, uppercase: true };
      }
      if (!checkNumber(currentPassword)) {
        errors = { ...errors, number: true };
      }
      if (!checkSpecial(currentPassword)) {
        errors = { ...errors, specialCharacter: true };
      }
      if (!checkNoSpace(currentPassword)) {
        errors = { ...errors, space: true };
      }
      if (!checkPasswordList(currentPassword)) {
        errors = { ...errors, common: true };
      }
    }
    setPasswordError(errors);
    console.log(passwordError);
  };
  const confirmPasswordValidate = (currentConfirmPassword) => {
    const errors = [];
    if (!checkNull(currentConfirmPassword)) {
      errors.push("Password must be confirmed again");
    } else {
      if (props.password !== currentConfirmPassword) {
        errors.push("Confirm password does not match");
      }
      setConfirmPasswordError(errors);
    }
  };
  return (
    <div className='flex flex-col justify-between h-full p-10'>
      <div className='flex flex-col items-center justify-center text-center gap-5'>
        <h2 className='text-2xl font-bold'>What's your password?</h2>
        <span className='text-webgrey'>Make a good one and remember it</span>
        <div>
          <RegisterProcess totalTabs='5' activeIndex='4' />
        </div>
        <PasswordInput
          text='Your Password'
          id='password'
          state={props.password}
          placeholder='1iofj aADNSI/.'
          setState={props.setPassword}
          stateError={passwordError}
          validate={passwordValidate}
          showInput={passwordShow}
          setShowInput={showPassword}
        />
        <Input
          text='Confirm Your Password'
          id='confirmPassword'
          state={props.confirmPassword}
          placeholder='1iofj aADNSI/.'
          setState={props.setConfirmPassword}
          stateError={confirmPasswordError}
          validate={confirmPasswordValidate}
          showInput={confirmPasswordShow}
          setShowInput={showPassword}
        />
      </div>
      <div className='flex gap-3 w-full mt-4'>
        <Button
          clickEvent={props.backPage}
          onlyIcon='fa-solid fa-arrow-left'
          className='w-1/2'
        />
        <Button
          clickEvent={props.nextPage}
          onlyIcon='fa-solid fa-arrow-right'
          disabled={
            Object.keys(passwordError).length !== 0 ||
            confirmPasswordError.length !== 0
          }
          className='w-1/2'
        />
      </div>
    </div>
  );
};

export default Password;
