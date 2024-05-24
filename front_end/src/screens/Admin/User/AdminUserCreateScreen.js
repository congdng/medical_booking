import React, { useEffect, useState } from "react";
import Button from "../../../pieces/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../pieces/Input/Input";
import Loader from "../../../pieces/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../../pieces/Input/PasswordInput";
import { register_as_admin } from "../../../actions/userActions";
import { USER_ADMIN_REGISTER_RESET } from "../../../constants/userConstant";
import Message from "../../../pieces/Message/Message";
import ToastComponent from "../../../components/Toast/ToastComponent";
import { ToastContainer, toast } from "react-toastify";

const AdminUserCreateScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDOB] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [file, setFile] = useState()
  const onChangeFile = (e)=>{
    if(e.target.files.length > 0){
      const type = e.target.files[0].type
      if (!(type.endsWith("jpeg")||type.endsWith("png"))){
            toast.error("Only .jpg or .png images are supported")
            setFile("")
            e.target.value = null
      }
      else setFile(e.target.files[0])
    }
  }

  //trainers
  const [experience, setExperience] = useState(0)
  const [department, setDepartment] = useState("Physiotherapy & Rehabilitation")
  const [language, setLanguage] = useState("Vietnamese")
  const exUnit = "years"

  const { loading, error, message } = useSelector(
    (state) => state.userAdminRegister
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (message) {
      history("/admin/user_list");
      dispatch({ type: USER_ADMIN_REGISTER_RESET });
    }
  }, [dispatch, history, message]);
  const submitHandler = () => {
    const roleInfo = {
      experience: experience+" "+exUnit,
      department,
      language,
      file,
    }
    dispatch(
      register_as_admin(
        username,
        email,
        name,
        gender,
        dob,
        ethnic,
        nationality,
        phoneNumber,
        address,
        password,
        role,
        roleInfo
      )
    );
  };
  const showPassword = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <div className='grid w-full'>
      <ToastContainer/>
      <Link to='/admin/user_list'>
        <Button>Back To User List</Button>
      </Link>
      <div className='flex flex-col justify-between h-full p-10'>
        <div className='flex flex-col items-center justify-center text-center gap-5'>
          <h2 className='text-2xl font-bold'>Create New User</h2>
          {loading && <Loader />}
          {error && <Message>{error}</Message>}
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-2'>
              <Input
                text='Username'
                id='username'
                state={username}
                setState={setUsername}
              />
              <Input
                text='Email'
                id='email'
                state={email}
                setState={setEmail}
              />
              <Input type='file' text='Upload your avatar' onChange={onChangeFile} />
            </div>
            <div className='flex gap-2'>
              <Input text='Name' id='name' state={name} setState={setName} />
              <PasswordInput
                text='Password'
                id='password'
                state={password}
                placeholder='1iofj aADNSI/.'
                setState={setPassword}
                showInput={passwordShow}
                setShowInput={showPassword}
                check={false}
              />
            </div>
            <div className='flex gap-2'>
              <div className='flex items-start gap-2 w-full'>
                <div className='w-full'>
                  <label
                    htmlFor='gender'
                    className='block mb-2 text-sm font-medium'
                  >
                    Gender
                  </label>
                  <select
                    id='gender'
                    value={gender}
                    onChange={(e) => {
                      let currentValue = e.target.value;
                      setGender(currentValue);
                    }}
                    className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                </div>
              </div>
              <Input
                text='Date of Birth'
                id='dob'
                state={dob}
                setState={setDOB}
              />
            </div>
            <div className='flex gap-2'>
              <Input
                text='Ethnic'
                id='ethnic'
                state={ethnic}
                setState={setEthnic}
              />
              <Input
                text='Nationality'
                id='nationality'
                state={nationality}
                setState={setNationality}
              />
              <Input
                text='Phone Number'
                id='phoneNumber'
                state={phoneNumber}
                setState={setPhoneNumber}
              />
            </div>
            <div className='flex gap-2'>
              <Input
                text='Address'
                id='address'
                state={address}
                setState={setAddress}
              />
              <div className='w-full'>
                <label
                  htmlFor='role'
                  className='block mb-2 text-sm font-medium'
                >
                  Role
                </label>
                <select
                  id='role'
                  value={role}
                  onChange={(e) => {
                    let currentValue = e.target.value;
                    setRole(currentValue);
                  }}
                  className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
                >
                  <option value='admin'>Admin</option>
                  <option value='patient'>Patient</option>
                  <option value='doctor'>Doctor</option>
                  <option value='trainer'>Trainer</option>
                  <option value='receptionist'>Receptionist</option>
                </select>
              </div>
            </div>
            {role === 'trainer' && <div className='flex gap-2'>
              <div className='w-full'>
            <label
                    htmlFor='department'
                    className='block mb-2 text-sm font-medium'
                  >
                    Department
                  </label>
              <select id = 'department'
              className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
              onChange={(e) => {
                    let currentValue = e.target.value;
                    setDepartment(currentValue);
                  }}
              >
              
                <option value='Physiotherapy & Rehabilitation'>Physiotherapy & Rehabilitation</option>
              </select>
              </div>
              <Input type="text" text={`Experience (${exUnit})`} state={experience} setState={setExperience}></Input>
              <div className='w-full'>
              <label
                    htmlFor='language'
                    className='block mb-2 text-sm font-medium'
                  >
                    Language
                  </label>
              <select id = 'language'
              className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
              onChange={(e) => {
                    let currentValue = e.target.value;
                    setLanguage(currentValue);
                  }}
              >

                <option value='Vietnamese'>Vietnamese</option>
                <option value='English'>English</option>
              </select>
                  </div>
              </div>}
          </div>
        </div>
        <div className='flex w-full'>
          <Button clickEvent={submitHandler} className='w-full'>
            Create New User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCreateScreen;
