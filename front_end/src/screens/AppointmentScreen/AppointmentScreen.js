import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useModal from "../../pieces/Modal/useModal";
import Modal from '../../pieces/Modal/Modal';

import {
  get_appointment_detail,
  pay_appointment,
  update_appointment,
} from "../../actions/appointmentAction";

import {
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_UPDATE_RESET,
} from "../../constants/appointmentConstant";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import Button from "../../pieces/Button/Button";
import Input from "../../pieces/Input/Input";
import { PayPalButton } from "react-paypal-button-v2";

import { statusOtherClass, status } from "../../constants/webconstant";
import { statusClassName } from "../../function/webFunction";
import { create_health_record } from "../../actions/HRAction";
import ToastComponent from "../../components/Toast/ToastComponent";
import { HEALTH_RECORD_SAVE_RESET } from "../../constants/HRConstant";




const cashRoles = ["admin", "receptionist"]

const AppointmentScreen = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const appointmentID = params.id;
  const [sdk, setSdk] = useState(false);
  const appointmentDetail = useSelector((state) => state.appointmentDetail);
  const { appointment, loading, error } = appointmentDetail;
  const appointmentPaid = useSelector((state) => state.appointmentPaid);
  const { loading: loadingPay, success: successPay } = appointmentPaid;
  const { success: successUpdate } = useSelector((state) => state.appointmentUpdate);
  const { error: hrerror, saveData } = useSelector((state) => state.healthrecordUpdate);

  const { isShowing, toggle } = useModal();

  const mcuSubmit = (e)=>{
    dispatch(create_health_record(
       appointment.patient_id._id,
     {
      appointment_id: appointment._id,
      bloodtype: e.target.bloodtype.value,
      weight: e.target.weight.value,
      height: e.target.height.value,
      bloodpressure: e.target.bloodpressure.value
      }
    ))
    toggle();
   
  }
  const MedicalCheckUp = () => <form onSubmit={mcuSubmit}>
    <div className='flex gap-4'>
      <div className='w-1/4 flex items-center text-center grow'>
        <div className='w-full'>
          <Input
            text='Blood Type'
            
            name='bloodtype'
            type={"text"}
            placeholder='O+'
          />
        </div>
      </div>
      <div className='w-1/4 flex items-center text-center'>
        <div className='w-full'>
          <Input
            text='Weight'
            name='weight'
            type={"text"}
            placeholder='50kg'
          />
        </div>
      </div>
      <div className='w-1/4 flex items-center text-center'>
        <div className='w-full'>
          <Input
            text='Height'
            name='height'
            type={"text"}
            placeholder='160cm'
          />
        </div>
      </div>
      <div className='w-1/4 flex items-center text-center'>
        <div className='w-full'>
          <Input
            text='Blood Pressure'
            name='bloodpressure'
            type={"text"}
            placeholder='160cc'
          />
        </div>
      </div>
    </div>
    <Button >Accept</Button>
  </form>


  useEffect(() => {
    dispatch({ type: APPOINTMENT_CREATE_RESET });
    // if (!userInfo) {
    //   history("/login");
    // }
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
    if (!appointment || successPay || successUpdate || appointment._id !== appointmentID || saveData) {

      dispatch({ type: APPOINTMENT_PAY_RESET });
      dispatch({ type: APPOINTMENT_UPDATE_RESET });
      dispatch({ type: HEALTH_RECORD_SAVE_RESET });
      
      dispatch(get_appointment_detail(appointmentID));
    } else if (!appointment.isPaid) {
      if (!window.paypal) {
        addPaypal();
      } else {
        setSdk(true);
      }
    }
  }, [dispatch, appointment, appointmentID, userInfo, history, successPay, successUpdate, saveData]);

  useEffect(() => {
    if (saveData) {
   
    dispatch(update_appointment({ _id: appointment._id, bookingStatus: 'confirmed' }));
    }
  }, [saveData]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(pay_appointment(appointmentID, paymentResult));
  };

  const onCash = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    successPaymentHandler({
      method: "cash",
      id: "CASH" + randomNumber,
      status: "success",
      update_time: new Date(),
    })
  }
  const onAcceptAppt = () => {
    toggle();


  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <div className='w-full flex gap-8'>
      {(hrerror||error) && <ToastComponent data={hrerror || error} type="error" />}
      <Modal isShowing={isShowing} hide={toggle} component={<MedicalCheckUp/>}/>
      <div className='w-1/2 my-4 flex flex-col gap-4'>
        <div className='text-xl font-bold'> APPOINTMENT #{appointment._id}</div>
        <div className='flex flex-col gap-2'>
          <div className={statusOtherClass + " " + statusClassName(status, appointment.bookingStatus)}>{appointment.bookingStatus}</div>
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
          <div className='text-websecondary font-medium'> Doctor in charge</div>
          <div>{appointment.doctor_id.user_id.name}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'>Department</div>
          <div>{appointment.clinic_id.name}</div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-websecondary font-medium'>Booking User</div>
          <div>{appointment.name || appointment.patient_id.name}</div>
        </div>
        <div className='flex-flex-col gap-2'>
          <div className='text-websecondary font-bold text-lg'>
            Appointment Detail
          </div>
          <div>
            <span className='text-websecondary'>Name: </span>
            {appointment.name || appointment.patient_id.name}
          </div>
          <div>
            <span className='text-websecondary'>Email: </span>
            {appointment.email}
          </div>
          <div>
            <span className='text-websecondary'>Phone Number: </span>
            {appointment.phoneNumber}
          </div>
          <div>
            <span className='text-websecondary'>Date: </span>
            {appointment.date}
          </div>
          <div>
            <span className='text-websecondary'>Session: </span>
            {appointment.session}
          </div>
          <div>
            <span className='text-websecondary'>Date of Birth: </span>
            {appointment.dob}
          </div>
          <div>
            <span className='text-websecondary'>Address: </span>
            {appointment.address}
          </div>
          <div>
            <span className='text-websecondary'>Re Medical: </span>
            {appointment.reMedical ? "true" : "false"}
          </div>
          <div>
            <span className='text-websecondary'>Total Price: </span>
            {appointment.price} USD
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

        {
          (userInfo && cashRoles.indexOf(userInfo.role) !== -1)
            ? (
              <div className="flex w-full">
                {!appointment.isPaid && appointment.typeOfPayment === "cash" && <Button className="w-full" clickEvent={onCash}>Mark as Paid</Button>}
                <Button className="w-full" clickEvent={() => onAcceptAppt()}>Accept</Button>
                <Button className="w-full" clickEvent={() => dispatch(update_appointment({ _id: appointment._id, bookingStatus: 'canceled' }))}>Reject</Button>
              </div>
            )
            : <Button className="w-full" clickEvent={() => dispatch(update_appointment({ _id: appointment._id, bookingStatus: 'canceled' }))}>Cancel this appointment</Button>}


      </div>
    </div>
  );
};

export default AppointmentScreen;
