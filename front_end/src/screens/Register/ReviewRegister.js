import React, { useEffect } from "react";
import RegisterProcess from "../../components/register_process/RegisterProcess.js";
import Button from "../../pieces/Button/Button.js";
import Input from "../../pieces/Input/Input.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions.js";
import Message from "../../pieces/Message/Message.js";
import Loader from "../../pieces/Loader/Loader.js";

const ReviewRegister = (props) => {
  const {
    userName,
    password,
    email,
    name,
    phoneNumber,
    gender,
    dob,
    ethnic,
    nationality,
    address,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, message } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
    if (message){
      history("/activation-email")
    }
  }, [history, userInfo, redirect, message]);
  const submitHandler = () => {
    dispatch(
      register({
        username: userName,
        password,
        email,
        name,
        phoneNumber,
        gender,
        dob,
        ethnic,
        nationality,
        address,
      })
    );
  };
  return (
    <div className='flex flex-col justify-between h-full p-10'>
      <div className='flex flex-col items-center justify-center text-center gap-5'>
        <h2 className='text-2xl font-bold'>Review Your Information</h2>
        <div>
          <RegisterProcess totalTabs='5' activeIndex='5' />
        </div>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <div className='flex flex-col gap-1 w-full'>
          <Input
            text='Username'
            id='username'
            state={props.userName}
            readonly
          />
          <Input text='Email' id='email' state={props.email} readonly />
          <Input
            text='Password'
            id='password'
            state={props.password}
            readonly
          />
          <Input text='Name' id='name' state={props.name} readonly />
          <div className='flex gap-2'>
            <Input text='Gender' id='gender' state={props.gender} readonly />
            <Input text='Date of Birth' id='dob' state={props.dob} readonly />
          </div>
          <div className='flex gap-2'>
            <Input text='Ethnic' id='ethnic' state={props.ethnic} readonly />
            <Input
              text='Nationality'
              id='nationality'
              state={props.nationality}
              readonly
            />
          </div>
          <Input
            text='PhoneNumber'
            id='phoneNumber'
            state={props.phoneNumber}
            readonly
          />
          <Input text='Address' id='address' state={props.address} readonly />
        </div>
      </div>
      <div className='flex w-full'>
        <Button
          clickEvent={props.backPage}
          onlyIcon='fa-solid fa-arrow-left'
          className='w-1/2'
        />
        <Button
          clickEvent={submitHandler}
          className='w-1/2'
          onlyIcon='fa-solid fa-arrow-right'
        ></Button>
      </div>
    </div>
  );
};

export default ReviewRegister;
