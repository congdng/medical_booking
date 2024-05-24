import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import Message from "../../../pieces/Message/Message";
import { list_phy_apppointment } from "../../../actions/physicalAppAction";

const AdminPhyAppointmentListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const appointmentList = useSelector((state) => state.physicaltherapyAppointmentList);
  const { loading, error, appointments } = appointmentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const roles = ["admin", "receptionist"]
  useEffect(() => {
    if (userInfo && roles.indexOf(userInfo.role)!==-1) {
      dispatch(list_phy_apppointment(userInfo.role));
    } else {
      history("/");
    }
  }, [dispatch, history, userInfo]);
  const deleteHandler = (id) => {};
  return (
    <div className='grid w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='mb-8 font-semibold text-websecondary text-3xl'>
          Appointments
        </h1>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg my-5 w-full'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    ID
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Patient
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Trainer
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Exercise
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Time
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Navigation
                  </th>  
                </tr>
              </thead>
              <tbody>
                {appointments
                  ? appointments.map((appointment) => (
                      <tr className='bg-white border-b' key={appointment._id}>
                        <th
                          scope='row'
                          className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                        >
                          {appointment._id}
                        </th>
                        <td className='px-6 py-4'>
                          {appointment.name || appointment.patient_id.name}
                        </td>
                        <td className='px-6 py-4'>
                          {appointment.trainer_id.name}
                        </td>
                        <td className='px-6 py-4'>
                          <div>{appointment.exercises.length} exercises</div>
                          {appointment.exercises.map((exercise, index)=>
                            <div className="flex gap-4">
                              <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                              {exercise.exercise_id.name}
                              </div>
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          {`${appointment.date} ${appointment.session}`}
                          <div>
                          {appointment.isPaid ? (
                            <>
                            <FontAwesomeIcon
                              icon={"fa-solid fa-check"}
                              className='text-green-600'
                            /> Paid
                            </>
                          ) : (
                            <>
                            <FontAwesomeIcon
                              icon={"fa-solid fa-x"}
                              className='text-red-500'
                            />
                            Unpaid
                            </>
                          )}
                          <div className="flex">
                          {appointment.bookingStatus === "accepted" ? (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-check"}
                              className='text-green-600'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-x"}
                              className='text-red-500'
                            />
                          )}{appointment.bookingStatus}
                          </div>
                          </div>
                          </td>
                        
                        <td className='px-6 py-4 flex flex-col gap-4'>
                        <Link to={`/phyapp/${appointment._id}`}>
                            <Button
                              size='small'
                              leftIcon='fa-solid fa-eye'
                            > View payment</Button>
                          </Link>
                          <Button size='small'>Accept appointment</Button>
                        </td>
                
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPhyAppointmentListScreen;
