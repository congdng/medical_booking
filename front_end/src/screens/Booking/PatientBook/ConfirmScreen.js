import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../pieces/Button/Button'
import { make_appointment } from '../../../actions/appointmentAction';
import { make_phy_appointment } from '../../../actions/physicalAppAction';
import Message from '../../../pieces/Message/Message';
import ToastComponent from '../../../components/Toast/ToastComponent';
import useModal from '../../../pieces/Modal/useModal';
import Modal from '../../../pieces/Modal/Modal';

const ConfirmPayment = ({ action = () => { } }) => {
    const { isShowing, toggle } = useModal()
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethod = (method) => {
        if (method ==="cash") toggle();
        else setPaymentMethod('online');
    };

    const CashCaution = () =>
        <div className="flex flex-col items-center">
            <div>Do you want to pay by cash?</div>
            <div> You have to be sure at the clinic to choose this option.</div>
            <div className="flex">
                <Button clickEvent={() => { setPaymentMethod('cash'); toggle() }}>Yes</Button>
                <Button clickEvent={() => { toggle() }}>No</Button>
            </div>
        </div>
    return (
        <div>
            {paymentMethod === '' ? <div className='flex justify-center mt-4'>
                <div className='mr-4'>
                    <Button clickEvent={() => handlePaymentMethod('cash')}>Pay by Cash</Button>
                </div>
                <div>
                    <Button clickEvent={() => handlePaymentMethod('online')}>Pay Online</Button>
                </div>

                <Modal isShowing={isShowing} hide={toggle} component={<CashCaution />}></Modal>
            </div> : <div>
                Method: {paymentMethod}
                <div className='mt-4'>
                    <Button clickEvent={() => action(paymentMethod)}>Confirm</Button>
                </div>
            </div>}


        </div>
    );
}
const ConfirmScreen = ({ data, nextStep }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const appointmentCreate = useSelector((state) => state.appointmentCreate)
    const { error: doctorError, success: doctorSuccess } = appointmentCreate
    const trainingCreate = useSelector((state) => state.physicaltherapyAppointmentCreate)
    const { error: trainingError, success: trainingSuccess } = trainingCreate
    const [error, setError] = useState()
    // console.log(userInfo)
    // console.log(data)

    useEffect(() => {
        if (doctorSuccess === true || trainingSuccess === true) nextStep()
        else {
            if (doctorError) setError(doctorError)
            else if (trainingError) setError(trainingError)
        }
    }, [doctorSuccess, trainingSuccess])
    const makeAppointmentHandler = (paymentMethod) => {
        dispatch(
            make_appointment({
                date: data.session.date,
                patient_id: userInfo._id,
                doctor_id: data.doctor._id,
                clinic_id: data.doctor.clinic_id,
                symptom: data.symptoms,
                session: data.session.hour,
                reMedical: false,
                email: userInfo.email,
                // gender,
                // dob,
                price: data.price || 200,
                typeOfPayment: paymentMethod,
                // phoneNumber,
                // address,
                // name,
                bookingStatus: "pending",
            })
        );

    };
    const makeTrainingAppointment = (paymentMethod) => {
        const updatedExercises = data.exercises.map(exercise => ({
            exercise_id: exercise.exercise_id._id,
            exercise_name: exercise.exercise_id.name,
            exercise_status: "not started"
        }));
        console.log(updatedExercises);
        dispatch(make_phy_appointment({
            date: data.date,
            session: data.hour,
            exlist_id: data.exerciseListId,
            exercises: updatedExercises,
            patient_id: userInfo._id,
            trainer_id: data.trainer._id,
            email: userInfo.email,
            price: renderPrice(),
            typeOfPayment: paymentMethod,
        }));
    }

    const priceCalculation = (exercises) => {
        return exercises.reduce((sum, exercise) => sum + exercise.exercise_id.price, 0)
    }
    const renderPrice = () => {
        return priceCalculation(data.exercises) || 200
    }

    return (
        <div>
            <div>
                {(doctorError || trainingError) && <ToastComponent data={doctorError || trainingError} type={"error"} />}
                <div className='block font-semibold text-2xl text-websecondary'>
                    Confirmation
                </div>
                <div className='flex flex-col '>
                    {data.type === 'appointment' ?
                        <div>
                            <div>Doctor: {data.doctor?.user[0]?.name}</div>
                            <div>Date: {data.session.date}</div>
                            <div>Hour:   {data.session.hour}</div>
                            <div>Symptoms: {data.symptoms}</div>
                            <div>Price: {data.price || '200.000VND'} </div>
                            <ConfirmPayment action={makeAppointmentHandler} />
                        </div> :
                        <div>
                            <div>Trainer: {data.trainer?.user_id.name}</div>
                            <div>Date: {data.date}</div>
                            <div>Hour:   {data.hour}</div>
                            <div>Exercise: {data.exercises.map(exercise => <div className='flex justify-between gap-4'>
                                <div>{exercise.exercise_id.name}</div>
                                <div>{exercise.exercise_id.price} USD</div>
                            </div>)}</div>
                            <div>Price: {renderPrice() + " USD"} </div>
                            <ConfirmPayment action={makeTrainingAppointment} />
                        </div>
                    }
                </div>


            </div>
        </div>
    )
}

export default ConfirmScreen