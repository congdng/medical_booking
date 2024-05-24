import React from "react";
import DepartmentBanner from '../DepartmentBanner.js'
import Button from "../../../pieces/Button/Button.js";

const DepartmentContent = () => {
  return (
    <div className='max-w-screen-xl mx-auto px-4 relative pb-14 bg-gray-200'>
      <div className=' text-[32px] text-websecondary font-bold text-center pt-20'>
        <h2>Our Services</h2>
        <div className=''>
          <div className='p-4 mx-auto w-[800px] text-webblack font-normal text-base'>
            <span>
              At our hospital you will experience high quality, international
              standard health care
            </span>
          </div>
          <DepartmentBanner />
          <div className='text-center mt-20 inline-flex items-center'>
            <Button>See All</Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DepartmentContent;


