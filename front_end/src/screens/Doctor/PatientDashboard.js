import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import useModal from "../../pieces/Modal/useModal";
import Modal from "../../pieces/Modal/Modal";
import MedicalRecord from "./MedicalRecord";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_user_detail } from "../../actions/userActions";
import { health_record_list } from "../../actions/HRAction";

const PatientDashboard = () => {
  const dispatch = useDispatch()
  const { isShowing, toggle } = useModal();
  const {id} = useParams();
  useEffect(()=>{
    dispatch(get_user_detail(id));
    dispatch(health_record_list(id));
  },[id])
  const {user, loading, error}= useSelector((state)=>state.userDetails)

  return (
    <>
    {loading? <Loader/>:
    error? <Message>{error}</Message>:
    (
    <div className='grid grid-cols-[1fr_5fr] grid-flow-col h-[100vh] w-[100vw] overflow-hidden'>
      <div className='flex flex-col bg-webwhite bg-opacity-10 backdrop:text-webgrey text-[16px] gap-6 h-full p-[24px] text-webgrey font-semibold shadow-xl '>
        <div className='text-center text-webblack text-[36px] font-bold pb-10'>
          <span>BQL</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-house' />
          <span>Overview</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-calendar' />
          <span>Calendar</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-calendar-check' />
          <span>Appointments</span>
        </div>
        <div className='text-websecondary relative'>
          <div
            before=''
            className='before:content-[attr(before)] w-[4px] h-[100%] bg-websecondary absolute right-0'
          />
          <FontAwesomeIcon icon='fa-solid fa-person' />
          <span>Patients</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-message' />
          <span>Messages</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-envelope' />
          <span>Notifications</span>
        </div>
        <div>
          <FontAwesomeIcon icon='fa-solid fa-gear' />
          <span>Settings</span>
        </div>
      </div>
      <div className='bg-webthird bg-opacity-20 p-[24px] font-semibold h-full'>
        <div className='flex items-center mb-[48px]'>
          <div className='flex grow items-center text-[24px]'>
            <FontAwesomeIcon icon='fa-solid fa-user' />
            <span>{user.name}</span>
          </div>
          <div className='flex items-center text-[24px] gap-4'>
            <FontAwesomeIcon icon='fa-solid fa-comment' />
            <FontAwesomeIcon icon='fa-solid fa-bell' />
  
          </div>
        </div>
        <div className='flex items-center mb-[24px]'>
          <span className='text-websecondary'>Patient List</span>
          <div className='ml-3 text-[12px] text-webgrey'>
            <FontAwesomeIcon icon='fa-solid fa-chevron-right' />
          </div>
          <span className='text-webgrey opacity-20'>{user.name}</span>
        </div>
        {/* Content */}
        <div className='grid grid-cols-2 gap-4 h-full'>
          {/* Left Panel */}
          <div className='flex flex-col gap-[40px]'>
            <div className='flex justify-between bg-white p-4 rounded-lg shadow-sm items-center'>
              <div className='flex gap-4 items-center relative'>
                <div className=' aspect-square rounded-full' style={{'width': '40px'}}>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/5556/5556499.png'
                    alt='avatar' className="rounded-full"
                  ></img>
                </div>
                <div className='flex flex-col'>
                  <span>{user.name}</span>
                  <span className='text-[12px] text-webgrey opacity-40'>
                    {user.email}
                  </span>
                </div>
              </div>
              <div className='bg-webprimary p-2 rounded-full text-webwhite '>
                <FontAwesomeIcon icon='fa-solid fa-message' className='p-0' />
              </div>
            </div>
            <div className='grid grid-cols-4 grid-rows-2 text-[12px] gap-4 bg-white p-4 rounded-lg shadow-sm'>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Date of Birth</span>
                <span>{user.dob}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Address</span>
                <span>{user.address}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Insurance</span>
                <span>Yes</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Re-medical</span>
                <span>Yes</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Social Number</span>
                <span>0522534345</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Phone Number</span>
                <span>0935061843</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Gender</span>
                <span>{user.gender}</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-webgrey opacity-50'>Registered on</span>
                <span>14.07.2022</span>
              </div>
            </div>
            <div className='bg-white p-4 mb-[40px] rounded-lg shadow-sm text-[12px] grow'>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex gap-4 bg-webthird rounded-[32px] items-center'>
                  <span className=' p-2 rounded-[24px] inline-block text-webwhite bg-webprimary'>
                    Upcoming Appointments
                  </span>
                  <span className='pr-4'>Post Appointments</span>
                </div>
                <div className='flex text-[16px] text-websecondary'>
                  <FontAwesomeIcon icon='fa-solid fa-file-arrow-up' />
                  <span>Add Appointment</span>
                </div>
              </div>
              <div> {/*uuuuuuuuuu */}
                <div className='grid grid-cols-[1fr_6fr] items-center'>
                  <div className='flex flex-col'>
                    <span className='text-[16px] font-bold'>23</span>
                    <span className='text-webgrey opacity-50'>THURS</span>
                  </div>
                  <div className='bg-webthird bg-opacity-30 p-4'>
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Time</span>
                        <span>13:00</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Symptoms
                        </span>
                        <span>Neck Pain</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Category
                        </span>
                        <span>Bones</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Doctor</span>
                        <span>Dr. Banh Quang Long</span>
                      </div>
                      <span className='w-20 text-green-900 bg-green-500 bg-opacity-50 p-2 rounded-[36px]'>
                        Confirmed
                      </span>
                      <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                    </div>
                  </div>
                </div>
                <div className='grid grid-cols-[1fr_6fr] items-center'>
                  <div className='flex flex-col'>
                    <span className='text-[16px] font-bold'>24</span>
                    <span className='text-webgrey opacity-50'>FRI</span>
                  </div>
                  <div className='bg-webthird bg-opacity-30 p-4 flex flex-col gap-2'>
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Time</span>
                        <span>13:00</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Symptoms
                        </span>
                        <span>Neck Pain</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Category
                        </span>
                        <span>Bones</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Doctor</span>
                        <span>Dr. Banh Quang Long</span>
                      </div>
                      <span className='w-20 text-green-900 bg-green-500 bg-opacity-50 p-2 rounded-[36px]'>
                        Confirmed
                      </span>
                      <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Time</span>
                        <span>13:00</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Symptoms
                        </span>
                        <span>Neck Pain</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Category
                        </span>
                        <span>Bones</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Doctor</span>
                        <span>Dr. Banh Quang Long</span>
                      </div>
                      <span className='w-20 text-red-900 bg-red-500 bg-opacity-50 p-2 rounded-[36px]'>
                        Canceled
                      </span>
                      <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                    </div>
                    <div className='flex justify-between items-center'>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Time</span>
                        <span>13:00</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Symptoms
                        </span>
                        <span>Neck Pain</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>
                          Category
                        </span>
                        <span>Bones</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-webgrey opacity-50'>Doctor</span>
                        <span>Dr. Banh Quang Long</span>
                      </div>
                      <span className='w-20 text-yellow-900 bg-yellow-500 bg-opacity-50 p-2 rounded-[36px]'>
                        Pending
                      </span>
                      <FontAwesomeIcon icon='fa-solid fa-chevron-down' />
                    </div>
                  </div>
                </div>
              </div>{/*uuuuuuuuuu */}
            </div>
          </div>
          {/* Right Panel */}
          <div className='flex flex-col'>
            <div className='bg-white p-4 rounded-lg shadow-sm mb-[40px]'>
              <div className='flex justify-between items-center mb-4 '>
                <span className='text-webblack'>Documents</span>
                <div className='flex text-websecondary'>
                  <FontAwesomeIcon icon='fa-solid fa-file-arrow-up' />
                  <span>Add file</span>
                </div>
              </div>
              <div className='flex flex-col gap-4 text-[12px] mb-[24px]'>
                <div className='flex items-center mt-2'>
                  <FontAwesomeIcon icon='fa-solid fa-file' />
                  <span className='grow'>Medical Check.pdf</span>
                  <FontAwesomeIcon
                    icon='fa-solid fa-circle-down'
                    className='text-webgrey opacity-50'
                  />
                </div>
                <div className='flex items-center mt-2'>
                  <FontAwesomeIcon icon='fa-solid fa-file' />
                  <span className='grow'>Paying Bill.pdf</span>
                  <FontAwesomeIcon
                    icon='fa-solid fa-circle-down'
                    className='text-webgrey opacity-50'
                  />
                </div>
              </div>
              <div className='text-center text-webgrey'>
                <span>See all</span>
              </div>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-sm text-[12px] grow'>
              <div className='text-[16px] flex justify-between items-center mb-4'>
                <span className='text-webblack'>Medical Records</span>
                <div className='flex text-websecondary hover:cursor-pointer' onClick={toggle}>
                  <FontAwesomeIcon icon='fa-solid fa-file-arrow-up' />
                  <span>Add record</span>
                </div>
              </div>
              <Modal isShowing={isShowing} hide={toggle} component={<MedicalRecord id={id} />}/>
              <div className='flex flex-col bg-webthird bg-opacity-50 p-4 rounded-lg mb-4'>
                <p className='mb-4 text-webgrey opacity-60'>
                  The structure of a paragraph generally follows the following
                  sequence: topic sentence, supporting sentences, concluding
                  sentence.
                </p>
                <div className='flex items-center'>
                  <span className='grow text-webgrey text-[16px]'>
                    24.11.2023
                  </span>
                  <div className='flex gap-4 items-center'>
                    <span className='inline-block text-webprimary'>Cancel</span>
                    <span className='inline-block bg-websecondary text-webwhite rounded-2xl px-6 py-2'>
                      Save
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-4 mb-6'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Dates</span>
                    <span>24.11.2023</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Symptoms</span>
                    <span>Neck Pain</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Specialist</span>
                    <span>Dr. Banh Quang Long</span>
                  </div>
                  <div className='flex'>
                    <FontAwesomeIcon icon='fa-solid fa-circle-down' />
                    <FontAwesomeIcon icon='fa-solid fa-ellipsis-vertical' />
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Dates</span>
                    <span>24.11.2023</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Symptoms</span>
                    <span>Neck Pain</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-webgrey opacity-50'>Specialist</span>
                    <span>Dr. Banh Quang Long</span>
                  </div>
                  <div className='flex'>
                    <FontAwesomeIcon icon='fa-solid fa-circle-down' />
                    <FontAwesomeIcon icon='fa-solid fa-ellipsis-vertical' />
                  </div>
                </div>
              </div>
              <span className='block text-center text-webgrey text-[16px]'>
                See all
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  )
};

export default PatientDashboard;
