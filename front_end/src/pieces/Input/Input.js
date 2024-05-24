import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Input = ({
  type,
  text,
  name,
  id,
  placeholder = "",
  onChange = ()=> {},
  state,
  setState = () => {},
  stateError = "",
  validate = () => {},
  readonly = false,
}) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium'>
        {text}
      </label>
      <div className='relative'>
        <input
          key={id}
          type={type}
          id={id}
          name={name}
          autoComplete='on'
          placeholder={placeholder}
          value={state}
          readOnly={readonly}
          onChange={(e) => {
            onChange(e);
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
      </div>
      {Array.isArray(stateError) ? (
        !stateError.length ? (
          <></>
        ) : (
          <div className='flex flex-col gap-1 items-start'>
            {stateError.map((error, index) => {
              return (
                <div
                  key={index}
                  className='mt-1 flex items-center gap-2 text-xs text-red-600'
                >
                  <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
                  <span>{error}</span>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;