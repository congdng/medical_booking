import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  get_clinic_detail,
  update_clinic,
} from "../../../actions/clinicActions";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import ToastComponent from "../../../components/Toast/ToastComponent";
import Input from "../../../pieces/Input/Input";
import { CLINIC_UPDATE_RESET } from "../../../constants/clinicConstant";

const AdminClinicEditScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [special, setSpecial] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const clinicID = params.id;
  const clinicDetail = useSelector((state) => state.clinicDetail);
  const { loading, error, clinic } = clinicDetail;
  const clinicUpdate = useSelector((state) => state.clinicUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = clinicUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CLINIC_UPDATE_RESET });
      history("/admin/clinic_list");
    } else {
      if (!clinic?.name || clinic?._id !== clinicID) {
        dispatch(get_clinic_detail(clinicID));
      } else {
        setName(clinic.name);
        setDescription(clinic.description);
        setImage(clinic.image);
        setLink(clinic.link);
        setSpecial(clinic.special);
      }
    }
  }, [dispatch, clinicID, history, successUpdate, clinic]);
  const submitHandler = () => {
    dispatch(
      update_clinic({
        _id: clinicID,
        name,
        description,
        image,
        link,
        special,
      })
    );
  };
  return (
    <div className='grid w-full'>
      <Link to='/admin/clinic_list'>
        <Button>Back To Clinic List</Button>
      </Link>
      {loadingUpdate && <Loader />}
      {errorUpdate && <ToastComponent data={errorUpdate} type={error} />}
      <div className='flex flex-col justify-between h-full p-10'>
        <div className='flex flex-col items-center justify-center text-center gap-5'>
          <h2 className='text-2xl font-bold'>Update Clinic Information</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <ToastComponent data={error} type='error' />
          ) : (
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
                  value={description}
                  name='description'
                  rows='5'
                  cols='33'
                  className='w-full border-2'
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
        </div>
        <div className='flex w-full'>
          <Button clickEvent={submitHandler} className='w-full'>
            Update Clinic
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminClinicEditScreen;
