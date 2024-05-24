import React from "react";

const RegisterProcess = ({ activeIndex, totalTabs }) => {
  return (
    <div className='flex gap-2'>
      {Array.from(Array(Number(totalTabs))).map((x, index) => (
        <span
          key={index}
          className={`w-[24px] h-1 relative ${
            index === Number(activeIndex) - 1
              ? "bg-websecondary"
              : "bg-webgrey bg-opacity-40"
          }`}
        />
      ))}
    </div>
  );
};

export default RegisterProcess;
