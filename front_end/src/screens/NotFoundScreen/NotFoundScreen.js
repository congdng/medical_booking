import React from "react";
import { Link } from "react-router-dom";
import Button from "../../pieces/Button/Button";

const NotFoundScreen = () => {
  return (
    <div className='h-[70vh] flex justify-center items-center flex-col gap-32 mx-auto'>
      <h1 className='text-websecondary text-[150px] text-center select-none'>
        404 NOT FOUND
      </h1>
      <Link to='/'>
        <Button>Back to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundScreen;
