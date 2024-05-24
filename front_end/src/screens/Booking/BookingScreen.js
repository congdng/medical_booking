import React, { useEffect, useState } from "react";
import Input from "../../pieces/Input/Input";
import Button from "../../pieces/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { get_doctor_detail } from "../../actions/userActions";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import moment from "moment";
import { make_appointment } from "../../actions/appointmentAction";
import { APPOINTMENT_CREATE_RESET } from "../../constants/appointmentConstant";

const BookingScreen = () => {
  const [query, setQuery] = useSearchParams();
  console.log(query.get("period"));
  console.log(query.get("date"));
  const [date, setDate] = useState(query.get("date"));
  const [symptom, setSymptom] = useState("");
  const [session, setSession] = useState(query.get("period"));
  const [reMedical, setReMedical] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [price, setPrice] = useState(300);
  const [typeOfPayment, setTypeOfPayment] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();
  const doctorID = params.id;
  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { loading, error, doctor } = doctorDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const appointmentCreate = useSelector((state) => state.appointmentCreate);
  const { appointment, success, error: errorCreate } = appointmentCreate;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getWeekDate = (date) => {
    const dateMomentObject = moment(date, "l");
    const dateObject = dateMomentObject.toDate();
    return weekday[dateObject.getDay()];
  };

  useEffect(() => {
    if (success) {
      history(`/appointment/${appointment._id}`);
    } else {
      dispatch({ type: APPOINTMENT_CREATE_RESET });
    }
  }, [history, success, dispatch]);

  useEffect(() => {
    dispatch(get_doctor_detail(doctorID));
  }, [dispatch, doctorID]);
  const onOptionChange = (e) => {
    setTypeOfPayment(e.target.value);
  };
  const makeAppointmentHandler = () => {
    dispatch(
      make_appointment({
        patient_id: userInfo? userInfo._id : "65b0e7f335faaf57b2b265e9",
        doctor_id: doctor[0]._id,
        clinic_id: doctor[0].clinic_id,
        date,
        symptom,
        session,
        reMedical,
        name,
        email,
        gender,
        dob,
        price,
        typeOfPayment,
        phoneNumber,
        address,
      })
    );
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className='p-4 bg-gray-300 flex flex-col gap-4 w-full rounded-2xl'>
            <div className='flex items-center gap-4'>
              <img
                src={doctor[0]?.imageLink}
                alt='Avatar'
                className='rounded-full aspect-square max-w-[15vw]'
              />
              <div className='flex flex-col gap-1'>
                <span>APPOINTMENT BOOKING</span>
                <span className='font-medium text-websecondary'>
                  {`Doctor ${doctor[0]?.user[0].name}`}
                </span>
                <span>
                  {session} - {getWeekDate(date)} - {date}
                </span>
              </div>
            </div>
            <div className='bg-white p-4 flex flex-col gap-2'>
              <div className='flex gap-3'>
                <input type='radio' id='myself' name='booking' value='myself' />
                <label htmlFor='html'>Booking for myself</label>
                <input type='radio' id='other' name='booking' value='other' />
                <label htmlFor='css'>Booking for other</label>
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <div className='flex gap-2 items-center'>
                  <Input
                    text='Email'
                    id='email'
                    state={email}
                    setState={setEmail}
                  />
                  <input
                    id='reMedical'
                    type='checkbox'
                    checked={reMedical}
                    onChange={() => setReMedical(!reMedical)}
                  />
                  <label htmlFor='reMedical'>Re Medical</label>
                </div>
                <div className='flex gap-2'>
                  <Input
                    text='Name'
                    id='name'
                    state={name}
                    setState={setName}
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
                    text='Address'
                    id='address'
                    state={address}
                    setState={setAddress}
                  />
                  <Input
                    text='Phone Number'
                    id='phoneNumber'
                    state={phoneNumber}
                    setState={setPhoneNumber}
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='Symptom'
                    className='block mb-2 text-sm font-medium'
                  >
                    Symptom
                  </label>
                  <textarea
                    id='Symptom'
                    value={symptom}
                    name='symptom'
                    rows='5'
                    cols='33'
                    className='w-full border-2'
                    onChange={(e) => setSymptom(e.target.value)}
                  ></textarea>{" "}
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span className='text-websecondary font-medium'>
                  Way to deposit
                </span>
                <div className='flex gap-3'>
                  <input
                    type='radio'
                    id='online'
                    name='booking'
                    value='online'
                    onChange={onOptionChange}
                  />
                  <label htmlFor='html'>Online Paypal</label>
                  <input
                    type='radio'
                    id='offline'
                    name='booking'
                    value='offline'
                    onChange={onOptionChange}
                  />
                  <label htmlFor='css'>Pay on Contact</label>
                </div>
              </div>
              <div className='bg-gray-300 p-4'>
                <div>
                  <div className='flex justify-between'>
                    <span>Clinic Fee</span>
                    <span>{price}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Booking Fee</span>
                    <span>Free</span>
                  </div>
                  <hr className='h-px my-8 bg-websecondary border-0'></hr>
                  <div className='flex justify-between'>
                    <span>Total</span>
                    <span>{price} USD</span>
                  </div>
                </div>
              </div>
              <div className='flex w-full'>
                {errorCreate && <Message>{errorCreate}</Message>}
                <Button className='w-full' clickEvent={makeAppointmentHandler}>
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BookingScreen;
