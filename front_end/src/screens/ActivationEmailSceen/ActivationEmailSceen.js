import React from "react";
import Button from "../../pieces/Button/Button";
import { Link } from "react-router-dom";

const ActivationEmailSceen = () => {
  return (
    <div className='h-screen flex justify-center items-center flex-col gap-10 mx-auto'>
      <h1 className='text-websecondary text-[70px] text-center select-none'>
        ACTIVATION EMAIL SENT
      </h1>
      <span>
        Please visit your gmail and use the link to activate your account
      </span>
      <Link to='https://mail.google.com/mail'>
        <Button>Go To GMAIL</Button>
      </Link>
    </div>
  );
};

export default ActivationEmailSceen;
