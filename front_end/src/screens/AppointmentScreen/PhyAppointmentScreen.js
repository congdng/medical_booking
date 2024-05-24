import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { 
  pay_phy_appointment, 
  get_phy_apppointment 
} from "../../actions/physicalAppAction";
import {
  PHY_APPOINTMENT_CREATE_RESET,
  PHY_APPOINTMENT_PAY_RESET,
} from "../../constants/appointmentConstant";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import Button from "../../pieces/Button/Button";
const cashRoles = ["admin", "receptionist"]
const PhyAppointmentScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const appointmentID = params.id;
  const [sdk, setSdk] = useState(false);
  const appointmentDetail = useSelector((state) => state.physicaltherapyAppointmentDetail);
  const { appointment, loading, error } = appointmentDetail;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const appointmentPaid = useSelector((state) => state.physicaltherapyAppointmentPaid);
  const { loading: loadingPay, success: successPay } = appointmentPaid;
  useEffect(() => {
    dispatch({ type: PHY_APPOINTMENT_CREATE_RESET});
    if (!userInfo) {
      history("/login");
    }
    const addPaypal = async () => {
      const { data: clientId } = await axios.get(
        `http://localhost:8000/api/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdk(true);
      };
      document.body.appendChild(script);
    };
    console.log(appointment.length)
    if (!appointment || successPay || appointment._id !== appointmentID) {
      console.log("APP", appointment)
      dispatch({ type: PHY_APPOINTMENT_PAY_RESET });
      dispatch(get_phy_apppointment(appointmentID));
    } else if (!appointment.isPaid) {
      if (!window.paypal) {
        addPaypal();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch, appointment, appointmentID, userInfo, history, successPay]);
  // useEffect(()=>{
    
  //   console.log("INPHYAPP")
  //   console.log("DISPATCH", dispatch)},[dispatch])
  // useEffect(()=>{console.log("APP", appointment)},[appointment])
  // useEffect(()=>{console.log("APPID",appointmentID)},[appointmentID])
  // useEffect(()=>{console.log("USERINFO",userInfo)},[userInfo])
  // useEffect(()=>{console.log("HISTORY",history)},[history])
  // useEffect(()=>{console.log("SUCCESSPAY",successPay)},[successPay])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(pay_phy_appointment(appointmentID, paymentResult));
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div className='w-full flex gap-8'>
      <div className='w-1/2 my-4 flex flex-col gap-4'>
        <div className='text-xl font-bold'> APPOINTMENT #{appointment._id}</div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'>Payment Method</div>
          <p>
            <strong>Method: </strong>
            {appointment.typeOfPayment}
          </p>
          {appointment.isPaid ? (
            <div> Paid on {appointment.paidAt.substring(0, 10)}</div>
          ) : (
            <Message>Not Paid</Message>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'> Trainer in charge</div>
          <div>{appointment.trainer_id.name}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'>Exercise</div>
          <div>{appointment.exercises.map((exercise) =><div className='flex justify-between gap-4'>
                            <div>{exercise.exercise_id.name}</div>
                            <div>{exercise.exercise_id.price} USD</div>
                            </div>)}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'>Booking User</div>
          <div>{appointment.patient_id.name}</div>
        </div>
        <div className='flex-flex-col gap-2'>
          <div className='text-websecondary font-bold text-lg'>
            Appointment Detail
          </div>
          <div>
            <span className='text-websecondary'>Name: </span>
            {appointment.name || appointment.patient_id.name}
          </div>
          {/* <div>
            <span className='text-websecondary'>Email: </span>
            {appointment.email}
          </div>
          <div>
            <span className='text-websecondary'>Phone Number: </span>
            {appointment.phoneNumber}
          </div> */}
          <div>
            <span className='text-websecondary'>Date: </span>
            {appointment.date}
          </div>
          <div>
            <span className='text-websecondary'>Session: </span>
            {appointment.session}
          </div>
          {/* <div>
            <span className='text-websecondary'>Date of Birth: </span>
            {appointment.dob}
          </div>
          <div>
            <span className='text-websecondary'>Address: </span>
            {appointment.address}
          </div> */}
          <div>
            <span className='text-websecondary'>Total Price: </span>
            {appointment.price + " USD"}
          </div>
        </div>
      </div>
      <div className='w-1/2 mt-20'>
        {!appointment.isPaid && appointment.typeOfPayment === "online" && (
          <div>
            {loadingPay && <Loader />}
            {!sdk ? (
              <Loader />
            ) : (
              <PayPalButton
                amount={appointment.price}
                onSuccess={successPaymentHandler}
              ></PayPalButton>
            )}
          </div>
        )}
        {userInfo && cashRoles.indexOf(userInfo.role)!==-1 &&(
          <Button className="w-full">Mark as Paid</Button>
        )}
      </div>
    </div>
  );
};

export default PhyAppointmentScreen;
