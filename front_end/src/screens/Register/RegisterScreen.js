/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../pieces/Button/Button";
import Name_Email from "./Name_Email";
import PersonalInformation from "./PersonalInformation";
import ContactInformation from "./ContactInformation";
import Password from "./Password";
import ReviewRegister from "./ReviewRegister";

const RegisterScreen = () => {
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const forms = [
    <Name_Email
      nextPage={nextPage}
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
    />,
    <PersonalInformation
      nextPage={nextPage}
      backPage={backPage}
      name={name}
      setName={setName}
      nationality={nationality}
      setNationality={setNationality}
      gender={gender}
      setGender={setGender}
      dob={dob}
      setDOB={setDOB}
      ethnic={ethnic}
      setEthnic={setEthnic}
    />,
    <ContactInformation
      nextPage={nextPage}
      backPage={backPage}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      address={address}
      setAddress={setAddress}
    />,
    <Password
      nextPage={nextPage}
      backPage={backPage}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
    />,
    <ReviewRegister
      backPage={backPage}
      userName={username}
      email={email}
      name={name}
      gender={gender}
      dob={dob}
      ethnic={ethnic}
      nationality={nationality}
      phoneNumber={phoneNumber}
      address={address}
      password={password}
    />,
  ];

  function nextPage() {
    // console.log(page);
    setPage((curr) => curr + 1);
  }
  function backPage() {
    setPage((curr) => curr - 1 || 0);
  }
  return (
    <div className='max-w-screen-xl flex flex-col justify-between items-center m-auto p-4'>
      <div className='max-w-[70vw] flex items-stretch justify-center m-auto min-h-[70vh] rounded-2xl shadow-lg'>
        <div className='bg-websecondary w-1/2 flex flex-col items-center justify-center text-webwhite gap-10 rounded-l-3xl text-center p-10'>
          <h2 className='text-2xl font-bold'>Sign In</h2>
          <span className='text-base'>
            To keep connected with us and view your appointments and record,
            please login with your personal information
          </span>
          <Button type='white'>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              SIGN IN
            </Link>
          </Button>
        </div>
        <div className='w-1/2 border border-webgrey rounded-r-2xl'>
          {forms[page]}
        </div>
      </div>
    </div>
  );
};
export default RegisterScreen;
