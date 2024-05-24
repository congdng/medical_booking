import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { list_appointments } from "../../../actions/appointmentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../pieces/Button/Button";
import Loader from "../../../pieces/Loader/Loader";
import Message from "../../../pieces/Message/Message";

const AdminAppointmentListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const roles = ["admin", "receptionist"]
  useEffect(() => {
    if (userInfo && roles.indexOf(userInfo.role)!==-1) {
      dispatch(list_appointments());
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
          <div className='relative overflow-x-hidden shadow-md sm:rounded-lg my-5 w-full'>
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
                    Doctor
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Department
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Time
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Paid
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Done
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    View
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    <span className='sr-only'>Detail</span>
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
                          {appointment.doctor_id.user_id.name}
                        </td>
                        <td className='px-6 py-4'>
                          {appointment.clinic_id.name}
                        </td>
                        <td className='px-6 py-4'>{`${appointment.date} ${appointment.session}`}</td>
                        <td className='px-6 py-4'>
                          {appointment.isPaid ? (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-check"}
                              className='text-green-600'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-x"}
                              className='text-red-500'
                            />
                          )}
                        </td>
                        <td className='px-6 py-4'>
                          {appointment.bookingStatus === "confirmed" ? (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-check"}
                              className='text-green-600'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={"fa-solid fa-x"}
                              className='text-red-500'
                            />
                          )}
                        </td>
                        <td className='px-6 py-4 '>
                          <Link to={`/appointment/${appointment._id}`}>
                            <Button
                              size='small'
                              onlyIcon='fa-solid fa-eye'
                            ></Button>
                          </Link>
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

export default AdminAppointmentListScreen;
