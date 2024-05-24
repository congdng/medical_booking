import React, { useState } from "react";
import Input from "../../pieces/Input/Input.js";
import {
  checkEmail,
  checkLowerCase,
  checkNoSpace,
  checkNull,
  checkTextRange,
} from "../../function/validateFunction.js";
import RegisterProcess from "../../components/register_process/RegisterProcess.js";
import Button from "../../pieces/Button/Button.js";

const Name_Email = (props) => {
  const [usernameError, setUsernameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const disable =
    usernameError.length !== 0 ||
    emailError.length !== 0 ||
    props.username === "" ||
    props.email === "";

  const usernameValidate = (currentUsername) => {
    const errors = [];
    if (!checkNull(currentUsername)) {
      errors.push("You must enter a valid username");
    } else {
      if (!checkNoSpace(currentUsername)) {
        errors.push("Your username must not contain white space");
      }
      if (!checkLowerCase(currentUsername)) {
        errors.push("Your username must be in lowercase");
      }
      if (!checkTextRange(currentUsername, 6, 18)) {
        errors.push(
          "Your username must be longer than 6 and shorter than 19 characters"
        );
      }
    }
    setUsernameError(errors);
  };

  const emailValidate = (currentEmail) => {
    const errors = [];
    if (!checkNull(currentEmail)) {
      errors.push("You must enter an email");
    } else {
      if (!checkEmail(currentEmail)) {
        errors.push("You must enter a valid email from gmail.com");
      }
    }
    setEmailError(errors);
  };

  return (
    <div className='flex flex-col justify-between h-full p-10'>
      <div className='flex flex-col items-center justify-center text-center gap-3'>
        <h2 className='text-2xl font-bold'>What's your username and email?</h2>
        <div>
          <RegisterProcess totalTabs='5' activeIndex='1' />
        </div>
        <Input
          text='Your Username'
          id='username'
          state={props.username}
          placeholder='banhquanglong'
          setState={props.setUsername}
          stateError={usernameError}
          validate={usernameValidate}
        />
        <Input
          text='Your Email'
          id='email'
          state={props.email}
          placeholder='banhquanglong@gmail.com'
          setState={props.setEmail}
          stateError={emailError}
          validate={emailValidate}
        />
      </div>
      <Button
        clickEvent={props.nextPage}
        onlyIcon='fa-solid fa-arrow-right'
        disabled={disable}
      />
    </div>
  );
};

export default Name_Email;
