import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordInput = ({
  text,
  id,
  state,
  placeholder,
  setState,
  stateError="",
  validate = () => {},
  showInput = false,
  setShowInput = "",
  check = true,
}) => {
  return (
    <div className='w-full mb-4'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium'>
        {text}
      </label>
      <div className='relative mb-4'>
        <input
          key={id}
          type={showInput ? "password" : "text"}
          id={id}
          autoComplete='on'
          placeholder={placeholder}
          value={state}
          onChange={(e) => {
            let currentValue = e.target.value;
            setState(currentValue);
            validate(currentValue);
          }}
          className={
            !stateError.length
              ? "border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5"
              : "border border-webgrey block w-full p-2.5 text-sm rounded-lg bg-red-100 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
          }
        ></input>
        {setShowInput ? (
          <FontAwesomeIcon
            icon='fa-solid fa-eye'
            className='absolute right-[8px] top-[50%] translate-y-[-50%] cursor-pointer'
            onClick={() => setShowInput()}
          />
        ) : (
          <></>
        )}
      </div>
      {check ? (
        <>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.null === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password can not be empty</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.length === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password must have more than 6 characters</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.uppercase === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password must contains at least 2 uppercase</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.number === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password must contains at least 2 numbers</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.specialCharacter === true
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password must contains at least 2 special characters</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.space === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password must not contains space</span>
          </div>
          <div
            className={`mt-1 flex items-center gap-2 text-xs ${
              stateError.common === true ? "text-red-600" : "text-green-600"
            }`}
          >
            <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
            <span>Password is not too common</span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PasswordInput;
