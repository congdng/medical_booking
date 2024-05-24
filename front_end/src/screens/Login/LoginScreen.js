import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../pieces/Message/Message";
import Loader from "../../pieces/Loader/Loader";
import { login } from "../../actions/userActions";
import Button from "../../pieces/Button/Button";
import Input from "../../pieces/Input/Input";
import { checkNull } from "../../function/validateFunction.js";
import PasswordInput from "../../pieces/Input/PasswordInput.js";
import { testAccount } from "../../constants/webconstant.js";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [passwordShow, setPasswordShow] = useState(true);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = () => {
    dispatch(login(username, password));
  };
  const usernameValidate = (currentUsername) => {
    const errors = [];
    if (!checkNull(currentUsername)) {
      errors.push("You must enter a valid username");
    }
    setUsernameError(errors);
  };
  const passwordValidate = (currentPassword) => {
    const errors = [];
    if (!checkNull(currentPassword)) {
      errors.push("You must enter a valid password");
    }
    setPasswordError(errors);
  };
  const showPassword = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <>
      <div className='max-w-screen-xl flex flex-col justify-between items-center m-auto p-4'>
        <div className='max-w-[70vw] flex items-stretch justify-center m-auto min-h-[70vh] rounded-2xl shadow-lg'>
          <div className='bg-websecondary w-1/2 flex flex-col items-center justify-center text-webwhite gap-10 rounded-l-3xl text-center p-10'>
            <h2 className='text-2xl font-bold'>Register</h2>
            <span className='text-base'>
              To keep connected with us and view your appointments and record,
              please login with your personal information
            </span>
            <Button type='white'>
              <Link to='/register'>REGISTER</Link>
            </Button>
          </div>
          <div className='flex flex-col justify-between h-full p-10'>
            <div className='flex flex-col items-center justify-center text-center gap-3'>
              <h2 className='text-2xl font-bold'>
                What's your username and password?
              </h2>
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              {message && <Message variant='danger'>{message}</Message>}
              <Input
                text='Your Username'
                id='username'
                state={username}
                placeholder='banhquanglong'
                setState={setUsername}
                stateError={usernameError}
                validate={usernameValidate}
              />
              <PasswordInput
                text='Your Password'
                id='password'
                state={password}
                placeholder='1iofj aADNSI/.'
                setState={setPassword}
                stateError={passwordError}
                validate={passwordValidate}
                showInput={passwordShow}
                setShowInput={showPassword}
                check={false}
              />
            </div>
            <Button
              clickEvent={submitHandler}
              onlyIcon='fa-solid fa-arrow-right'
            />
            Test with:
            <div className='flex justify-center'>
              {testAccount.map((account, index) =>  
                <Button type='text' key={index}
                clickEvent={()=>{
                  setUsername(account.username)
                  setPassword(account.password)
                }}>
                  {account.role}
                </Button>       
              )}
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
