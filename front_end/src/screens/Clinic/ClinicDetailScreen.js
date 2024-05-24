import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { list_doctors } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";

const ClinicDetailScreen = ({ clinic }) => {
  const [doctorArray, setDoctorArray] = useState([]);
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;
  const take_doctor_list = (doctors) => {
    return doctors.filter((doctor) => doctor.clinic[0]._id === clinic._id);
  };
  useEffect(() => {
    dispatch(list_doctors());
  }, [dispatch]);

  useEffect(() => {
    if (
      doctors?.length !== 0 &&
      doctors?.length !== undefined &&
      typeof doctors !== undefined
    ) {
      setDoctorArray(take_doctor_list(doctors));
    }
  }, [doctors]);

  return (
    <div className='my-5'>
      <div className='flex gap-4 flex-col justify-center items-center mb-9'>
        <span className='text-websecondary text-4xl font-bold'>
          {clinic.name}
        </span>
        <img src={clinic.image} alt='Clinic' className='w-[80vw]' />
        <span className='text-justify'>{clinic.description}</span>
      </div>
      <div className='bg-gray-300'>
        <h1 className='text-websecondary text-xl font-bold p-4'>Our Doctor</h1>
        {/* <DoctorBanner />
         */}
        <div className='px-4 flex flex-col gap-4'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <div>
              {doctorArray.map((doctor, index) => (
                <DoctorCard doctor={doctor} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicDetailScreen;
