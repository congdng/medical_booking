import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../pieces/Modal/useModal';
import Modal from '../../pieces/Modal/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExerciseModule from './ExerciseListModal';
import Button from '../../pieces/Button/Button';
import { list_phy_apppointment_trainer } from '../../actions/physicalAppAction';
import { StringToDate } from '../../function/webFunction';
import Loader from '../../pieces/Loader/Loader';
import Message from '../../pieces/Message/Message';

//patient_id, patient_name, gender, birth_year, symptoms, status, time_left
const sortAppointmentsByDate = (appointments) => {
    return appointments.sort((a, b) => StringToDate(a.date) - StringToDate(b.date));
};
const groupAppointmentsByDate = (appointments) => {
    const grouppedAppointments = {}
    appointments.forEach(app => {
        if (!grouppedAppointments[app.date]) {
            grouppedAppointments[app.date] = []
            grouppedAppointments[app.date].push(app)
        }
        else {
            grouppedAppointments[app.date].push(app)
        }
    })
    localStorage.setItem("grouppedAppointments", JSON.stringify(grouppedAppointments))
    return grouppedAppointments

}

const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const status = [
    { label: 'in progress', className: 'text-green-900 bg-green-500' },
    { label: 'not started', className: ' text-gray-900 bg-gray-500' },
    { label: 'done', className: 'text-gray-900 bg-gray-500' }
]

const statusClassName = (label) => {
    const getStatusElement = status.filter(item => item.label === label)
    return getStatusElement[0].className
}

const buttonClassName = 'w-20 p-2 rounded-[36px] bg-opacity-50'

const renderClassName = (label) => buttonClassName + ' ' + statusClassName(label)

function WaitingList() {
    const { isShowing, toggle } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(list_phy_apppointment_trainer())
    }, []);

    const { appointments, loading, error } = useSelector((state) => state.physicaltherapyAppointmentList)
    const appointmentAfterSort = appointments?.length > 0 ? sortAppointmentsByDate(appointments) : []
    const appointmentAfterGroup = appointmentAfterSort.length > 0 ? groupAppointmentsByDate(appointmentAfterSort) : []
    // console.log(appointmentAfterGroup)
    //physicaltherapyAppointmentUpdate
    const onExClick = (key, index) => {
        const appointmentInfo = appointmentAfterGroup[key][index];
        localStorage.setItem("appointmentInfo", JSON.stringify(appointmentInfo));
        toggle();
    }
    const { appointment: updated_app, loading: updated_loading } = useSelector((state) => state.physicaltherapyAppointmentUpdate)

    const renderStatus = (appointment) => {
        if (updated_loading) return appointment.exercise_status || 'undefined'
        else {
            if (updated_app && Object.keys(updated_app).length > 0 && updated_app._id === appointment._id) {
                if (updated_app.exercise_status !== appointment.exercise_status) {
                    return updated_app.exercise_status
                } else return appointment.exercise_status || 'undefined'
            }
            else return appointment.exercise_status || 'undefined'
        }

    }
    return (
        <>{(loading) ? (
            <Loader />
        ) : (error) ? (
            <Message>{error}</Message>
        ) : (appointmentAfterGroup.length === 0) ? <>No appointments yet</> : (
            <div className=' h-[100vh] w-[100vw]'>
                <div className='bg-webthird bg-opacity-20 p-[24px] font-semibold h-full'>
                    <div className='flex items-center mb-[24px]'>
                        <span className='text-websecondary'>Patient List</span>
                    </div>
                    {/* Content */}
                    <div className='grid gap-4 h-full'>
                        {/* Left Panel */}
                        <div className='flex flex-col gap-[40px]'>
                            <div className='bg-white p-4 mb-[40px] rounded-lg shadow-sm text-[12px] grow'>
                                <div className='flex justify-between items-center mb-4'>
                                    <div className='flex gap-4 bg-webthird rounded-[32px] items-center'>
                                        <span className=' p-2 rounded-[24px] inline-block text-webwhite bg-webprimary'>
                                            All Appointments
                                        </span>
                                        <span className='px-4'>Upcoming Appointments</span>
                                        <span className='px-4'>Past Appointments</span>
                                    </div>
                                    <div className='flex text-[16px] text-websecondary'>
                                        <FontAwesomeIcon icon='fa-solid fa-file-arrow-up' />
                                        <span>Add Appointment</span>
                                    </div>
                                </div>
                                <div> 
                                    {Object.entries(appointmentAfterGroup).map(([key, value]) => (
                                        <div className='grid grid-cols-[1fr_6fr] items-center' key={key}>
                                            <div className='flex flex-col'>
                                                <span className='text-[16px] font-bold'>{StringToDate(key).getDate() + "/" + (StringToDate(key).getMonth() + 1)}</span>
                                                <span className='text-webgrey opacity-50'>{weekDay[StringToDate(key).getDay()]}</span>
                                            </div>

                                            <div className='bg-webthird bg-opacity-30 p-4 flex flex-col gap-2'>
                                                {value.map((app, index) => (
                                                    <div className='flex justify-between items-center' key={index}>
                                                        <div className='flex flex-col'>
                                                            <span className='text-webgrey opacity-50'>
                                                                Session
                                                            </span>
                                                            <span>{app.session}</span>
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <span className='text-webgrey opacity-50'>
                                                                Patient Name
                                                            </span>
                                                            <span>{app.patient_id.name}</span>
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <span className='text-webgrey opacity-50'>
                                                                Gender
                                                            </span>
                                                            <span>{app.patient_id.gender}</span>
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <span className='text-webgrey opacity-50'>Birth year</span>
                                                            <span>{StringToDate(app.patient_id.dob).getFullYear()}</span>
                                                        </div>

                                                        {/* <span className={renderClassName(renderStatus(app))}>
                                                            {renderStatus(app)}
                                                        </span> */}
                                                        <span>
                                                            Status
                                                        </span>
                                                        <Button className='primary' size={"small"} clickEvent={() => onExClick(key, index)}>See the exercises</Button>
                                                        <Modal isShowing={isShowing} hide={toggle} component={<ExerciseModule />} />
                                                    </div>))}

                                            </div>
                                        </div>))}
                                    {/* <div className='grid grid-cols-[1fr_6fr] items-center'>
                                    <div className='flex flex-col'>
                                        <span className='text-[16px] font-bold'>23</span>
                                        <span className='text-webgrey opacity-50'>THURS</span>
                                    </div>
                                    <div className='bg-webthird bg-opacity-30 p-4 flex flex-col gap-2'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Time
                                                </span>
                                                <span>13:00</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Patient Name
                                                </span>
                                                <span>Banh Quang Long</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Gender
                                                </span>
                                                <span>Male</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Birth year</span>
                                                <span>1976</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Diagnosis</span>
                                                <span>Bones</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Time left</span>
                                                <span>00:00</span>
                                            </div>

                                            <span className='w-20 text-gray-900 bg-gray-500 bg-opacity-50 p-2 rounded-[36px]'>
                                                Done
                                            </span>
                                            <Button className='primary' size={"small"} clickEvent={toggle}>See the exercises</Button>

                                        </div>
                                        <Modal isShowing={isShowing} hide={toggle} component={<ExerciseModule/>} />
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
                                                <span className='text-webgrey opacity-50'>
                                                    Time
                                                </span>
                                                <span>13:00</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Patient Name
                                                </span>
                                                <span>Banh Quang Long</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Gender
                                                </span>
                                                <span>Male</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Birth year</span>
                                                <span>1976</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Diagnosis</span>
                                                <span>Bones</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Time left</span>
                                                <span>20:56</span>
                                            </div>

                                            <span className='w-20 text-green-900 bg-green-500 bg-opacity-50 p-2 rounded-[36px]'>
                                                In progress
                                            </span>
                                            <Button className='primary' size={"small"} clickEvent={toggle}>See the exercises</Button>

                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Time
                                                </span>
                                                <span>13:00</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Patient Name
                                                </span>
                                                <span>Banh Quang Long</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Gender
                                                </span>
                                                <span>Male</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Birth year</span>
                                                <span>1976</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Diagnosis</span>
                                                <span>Bones</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Time left</span>
                                                <span>--:--</span>
                                            </div>

                                            <span className='w-20 text-blue-900 bg-blue-500 bg-opacity-50 p-2 rounded-[36px]'>
                                                 Ready
                                            </span>
                                            <Button className='primary' size={"small"} clickEvent={toggle}>See the exercises</Button>

                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Time
                                                </span>
                                                <span>13:00</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Patient Name
                                                </span>
                                                <span>Banh Quang Long</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>
                                                    Gender
                                                </span>
                                                <span>Male</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Birth year</span>
                                                <span>1976</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Diagnosis</span>
                                                <span>Bones</span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <span className='text-webgrey opacity-50'>Time left</span>
                                                <span>--:--</span>
                                            </div>

                                            <span className='w-20 text-blue-900 bg-blue-500 bg-opacity-50 p-2 rounded-[36px]'>
                                                 Ready
                                            </span>
                                            <Button className='primary' size={"small"} clickEvent={toggle}>See the exercises</Button> 

                                        </div>
                                    </div>
                                </div>*/}
                                </div>
                            </div>
                        </div>
                        {/* Right Panel
                    <div className='flex flex-col'>

                    </div> */}
                    </div>
                </div>
            </div>
        )}</>
    )
}

export default WaitingList