import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CLINIC_CREATE_RESET } from "../../../constants/clinicConstant";
import { create_clinic } from "../../../actions/clinicActions";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import Message from "../../../pieces/Message/Message";
import Input from "../../../pieces/Input/Input";

const AdminClinicCreateScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [special, setSpecial] = useState("");
  const { loading, error, message } = useSelector(
    (state) => state.clinicCreate
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  useEffect(() => {
    if (message) {
      history("/admin/clinic_list");
      dispatch({ type: CLINIC_CREATE_RESET });
    }
  }, [dispatch, history, message]);
  const submitHandler = () => {
    dispatch(create_clinic(name, description, link, image, special));
  };
  return (
    <div className='grid w-full'>
      <Link to='/admin/user_list'>
        <Button>Back To Clinic List</Button>
      </Link>
      <div className='flex flex-col justify-between h-full p-10'>
        <div className='flex flex-col items-center justify-center text-center gap-5'>
          <h2 className='text-2xl font-bold'>Create New Clinic</h2>
          {loading && <Loader />}
          {error && <Message>{error}</Message>}
          <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-2'>
              <Input text='Name' id='name' state={name} setState={setName} />
              <Input
                text='Image'
                id='image'
                state={image}
                setState={setImage}
              />
            </div>
            <div className='flex gap-2'>
              <Input text='Link' id='link' state={link} setState={setLink} />
              <div className='flex items-start gap-2 w-full'>
                <div className='w-full'>
                  <label
                    htmlFor='special'
                    className='block mb-2 text-sm font-medium'
                  >
                    Specialist
                  </label>
                  <select
                    id='special'
                    value={special}
                    onChange={(e) => {
                      let currentValue = e.target.value;
                      setSpecial(currentValue);
                    }}
                    className='border border-webgrey block w-full p-2.5 text-sm rounded-lg mb-5'
                  >
                    <option value='Medical Specialties'>
                      Medical Specialties
                    </option>
                    <option value='Surgical Specialties'>
                      Surgical Specialties
                    </option>
                    <option value='Support Services'>Support Services</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='w-full'>
              <label
                htmlFor='description'
                className='block mb-2 text-sm font-medium'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                rows='5'
                cols='33'
                className='w-full border-2'
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className='flex w-full'>
          <Button clickEvent={submitHandler} className='w-full'>
            Create New Clinic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicCreateScreen;
