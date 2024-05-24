import React from "react";
import DoctorBanner from "../DoctorBanner.js";
import Button from "../../../pieces/Button/Button.js";

const DoctorContent = () => {
  return (
    <div className='max-w-screen-xl mx-auto p-4 mb-10'>
      <div className=' text-[32px] text-websecondary font-bold text-center pt-20'>
        <h2>Our Doctor</h2>
        <div className=''>
          <div className='p-4 mx-auto w-[800px] text-webblack font-normal text-base'>
            <span>At our hospital we and our staff work with all heart</span>
          </div>
          <DoctorBanner />
          <div className='text-center inline-flex items-center'>
            <Button>See All</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorContent;
