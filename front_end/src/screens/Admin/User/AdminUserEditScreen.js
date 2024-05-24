import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { get_user_detail } from "../../../actions/userActions";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import ToastComponent from "../../../components/Toast/ToastComponent";
import Input from "../../../pieces/Input/Input";
import { USER_UPDATE_ADMIN_RESET } from "../../../constants/userConstant";
import { updateUser } from "../../../actions/userActions";

const AdminUserEditScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [ethnic, setEthnic] = useState("");
  const [nationality, setNationality] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const userID = params.id;
  const userDetail = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetail;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      history("/admin/user_list");
    } else {
      if (!user?.username || user?._id !== userID) {
        dispatch(get_user_detail(userID));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setName(user.name);
        setGender(user.gender);
        setDOB(user.dob);
        setEthnic(user.ethnic);
        setNationality(user.nationality);
        setPhoneNumber(user.phoneNumber);
        setAddress(user.address);
        setRole(user.role);
      }
    }
  }, [user, dispatch, userID, history, successUpdate]);
  const submitHandler = () => {
    dispatch(
      updateUser({
        _id: userID,
        username,
        email,
        name,
        gender,
        dob,
        ethnic,
        nationality,
        phoneNumber,
        address,
        role,
      })
    );
  };
  return (
    <div className='grid w-full'>
      <Link to='/admin/user_list'>
        <Button>Back To User List</Button>
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <ToastComponent data={errorUpdate} type={error} />}
      <div className='flex flex-col justify-between h-full p-10'>
        <div className='flex flex-col items-center justify-center text-center gap-5'>
          <h2 className='text-2xl font-bold'>Update User Information</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <ToastComponent data={error} type='error' />
          ) : (
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
              </div>
              <Input text='Name' id='name' state={name} setState={setName} />
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
            </div>
          )}
        </div>
        <div className='flex w-full'>
          <Button clickEvent={submitHandler} className='w-full'>
            Update User Information
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminUserEditScreen;
