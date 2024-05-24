import React, { useEffect, useState } from 'react'
import Button from '../../pieces/Button/Button'
import Input from '../../pieces/Input/Input'
import Loader from '../../pieces/Loader/Loader'
import Countdown from '../../components/Countdown/Countdown'

import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { update_status } from '../../actions/physicalAppAction'
import { save_exercise_record } from '../../actions/ERAction'
import { addLeadingZero, statusClassName } from '../../function/webFunction'
const ExerciseModule = () => {

    const dispatch = useDispatch()

    const info = JSON.parse(localStorage.getItem("appointmentInfo"));
    const { exercises, patient_id: patient } = info;
    const { machine_id: machine } = exercises
    const feedbackTypes = ['back', 'neck', 'knee'];

    const [active, setActive] = useState(false)
    const [isTimeDone, setIsTimeDone] = useState(false)
    const [exerciseList, setExerciseList] = useState([])
    const [feedback, setFeedBack] = useState([{ body_part: feedbackTypes[0], rating: '' }])
    const [advice, setAdvice] = useState("")

    const contain_id = (id) => {
        return exerciseList.some(exercise => exercise.exercise_id.includes(id))
    }
    const chooseExercise = (exercise) => {

        if (contain_id(exercise._id)) {
            const index = exerciseList.indexOf({
                exercise_id: exercise._id,
                exercise_name: exercise.name
            })
            let newExList = [...exerciseList]
            newExList.splice(index, 1)
            // console.log("REMOVED", newExList)
            setExerciseList(newExList)
        }
        else {
            setExerciseList([...exerciseList, { exercise_id: exercise._id, exercise_name: exercise.name }])
        }

    }

    const onStart = () => {
        if (exerciseList.length === 0) toast.warning('Please select an exercise to start')
        else {
            setActive(!active)
        }
    }
    const timeComplete = () => {
        setActive(false)
        setIsTimeDone(true)
    }

    const RenderCountDown = () => {
        if (exerciseList.length > 0) return <Countdown initialTime={20000*exerciseList.length} active={active} callback={timeComplete} />
        else return <>{"--:--"}</>;
    }

    const renderExerciseProgress = (exercise) => {
        if ((contain_id(exercise._id))) {
            if (active) {
                dispatch(update_status(exercise._id, "in progress"))
                return 'in progress'
            }
            else if (isTimeDone) {
                dispatch(update_status(exercise._id, "done"))
                return 'done'
            }
            else {
                dispatch(update_status(exercise._id, "ready"))
                return 'ready'
            }
        }
        else return 'not started'
    }

    const criteria = 15 // Rating xx/15
    const addSlot = () => {
        setFeedBack(feedback => [...feedback, { body_part: feedbackTypes[0], rating: '' }])
    }

    const onBodyPartChange = (e, index) => {
        const newFeedBackList = [...feedback]
        feedback[index].body_part = e.target.value;
        setFeedBack(newFeedBackList)
    }
    const onRatingChange = (e, index) => {
        const newFeedBackList = [...feedback]
        feedback[index].rating = addLeadingZero(e.target.value) + "/" + criteria;
        setFeedBack(newFeedBackList)
    }


    const status = [
        { label: 'in progress', className: 'text-green-900 bg-green-500' },
        { label: 'ready', className: 'text-blue-900 bg-blue-500' },
        { label: 'not started', className: ' text-gray-900 bg-gray-500' },
        { label: 'done', className: 'text-gray-900 bg-gray-500' }
    ]

   
    const handleSubmit = () => {
        const patient_id = patient._id
        dispatch(save_exercise_record(info._id,
            { exerciseList, appt_id: info._id, exlist_id_to_update: info.exlist_id, patient_id, feedback, advice }))
        dispatch(update_status(info._id, "done"))
        window.location.reload();
    }

    const buttonClassName = 'w-20 p-2 rounded-[36px]'
    return (
        // <></>

        <div className='p-4 text-[14px]'>
            <ToastContainer />
            <span className='block font-semibold text-2xl text-websecondary'>
                Patient: {patient ? patient.name : 'Nguyen Van A'}
            </span>
            Doctor:
            {/* <Button className='bg-webprimary text-white' onClick={() => {window.location.href=`/trainer/exercise/${patientId}`}}>Add Exercise</Button> */}

            <div className='p-4 grid grid-flow-col grid-cols-2'>
                <Button className='primary' disabled={isTimeDone} clickEvent={() => onStart()}>{active ? "Stop" : "Start"}</Button>
                <span className='text-2xl px-4 text-center'>{RenderCountDown()}</span>
            </div>
            <div className='flex items-center text-center'>
                <table className='w-full '>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Machine</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>1</td>
                            <td>{exercises.name}</td>
                            <td>{machine.name}</td>
                            <td>
                                <span className={buttonClassName + ' ' + statusClassName(renderExerciseProgress(exercises))}>
                                    {renderExerciseProgress(exercises)}</span>
                            </td>
                            <td>
                                <Button disabled={isTimeDone} clickEvent={() => chooseExercise(exercises)}
                                    type={contain_id(exercises._id) ? "secondary" : "primary"}>
                                    {contain_id(exercises._id) ? "Unchoose" : "Choose"}</Button></td>
                        </tr> */}
                        {exercises.map((exercise, index)=> <tr>
                            <td>{index +1}</td>
                            <td>{exercise.exercise_id.name}</td>
                            <td>{exercise.exercise_id.machine_id.name}</td>
                            <td>
                                <span className={buttonClassName + ' ' + statusClassName(status, renderExerciseProgress(exercise))}>
                                    {renderExerciseProgress(exercise)}</span>
                            </td>
                            <td>
                                <Button disabled={isTimeDone} clickEvent={() => chooseExercise(exercise)}
                                    type={contain_id(exercise._id) ? "secondary" : "primary"}>
                                    {contain_id(exercise._id) ? "Unchoose" : "Choose"}</Button></td>
                        </tr>)}
                        {/* <tr>
                        <td>1</td>
                        <td>Exercise 1</td>
                        <td>Machine 1</td>
                        <td><span className={buttonClassName + ' ' + statusClassName('in progress')}>In Progress</span> 
                        <span>04:56</span>
                        </td>
                    </tr>
                    */}
                    </tbody>
                </table>

            </div>
            {isTimeDone && <div>
                <span className='text-lg text-websecondary'>
                    Rating
                </span>
                {feedback.map((f, index) => (
                    <div className="flex gap-4 align-center justify-center" key={index}>
                        <div className='pt-9'>{index + 1}</div>
                        <select id='body_part' value={f.body_part} onChange={(e) => onBodyPartChange(e, index)} >
                            {feedbackTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
                        </select>
                        <div className='flex'>
                            <Input type="text" text="Rating" onChange={(e) => onRatingChange(e, index)} />
                            <span className='pt-9'>/{criteria}</span>
                        </div>
                        <div className='pt-7'>
                            <Button onlyIcon={"fa-solid fa-plus"} clickEvent={() => addSlot()}></Button>
                        </div>
                    </div>

                ))}

                {/* [select dropdown (khop co, vai, tay)] [input]/15 (+) */}
                <div className='flex flex-col'>
                    <span className='text-lg text-websecondary'>
                        Advice
                    </span>
                    <textarea value={advice} onChange={(e) => setAdvice(e.target.value)} />
                </div>
                <div className="py-6">
                    <Button clickEvent={() => handleSubmit()}>Send feedback</Button>
                </div>
            </div>}

        </div>
    )

}

export default ExerciseModule