import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { exercise_record_appt_details } from '../../../actions/ERAction';
import Button from '../../../pieces/Button/Button';
import { Link, useParams } from 'react-router-dom';
import Loader from '../../../pieces/Loader/Loader';
import Message from '../../../pieces/Message/Message';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { renderDate } from '../../../function/webFunction';
export const TrainingHistoryScreen = () => {
  const params = useParams();
  const appointmentID = params.id;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(exercise_record_appt_details(appointmentID));
    return () => { }
  }, [appointmentID])

  const { appointment, loading, error } = useSelector((state => state.exerciserecordDetail))
  const [text, setText] = useEffect('')
  useEffect(() => {
    if (appointment) {
      if (appointment.length > 0) {
        console.log(typeof appointment.createdAt) 
      } else{
        setText(text => "No training data available")
      }
    }
  }, [appointment])

  const renderDateCreatedAt = (date) => {
    const newDate = new Date(date)
    return renderDate(newDate)
  }

  function transformRating(fraction_string) {
    var parts = fraction_string.split('/');
    var numerator = parseInt(parts[0]);
    return numerator
  }
  const renderStars = (number) => Array.from({ length: number }, (_, index) => (
    <FontAwesomeIcon icon="fa-solid fa-star" />
  ));

  return (
    <div className="grid w-full">
      <Link to='/profile'>
        <Button>Back To Profile</Button>
      </Link>

      {loading || appointment.length === 0 ? <Loader /> : error ? <Message>{error}</Message> : <>
        <div className='w-full flex gap-8'>
          <div className='w-1/2 my-4 flex flex-col gap-4'>
            <div className='text-xl font-bold'> TRAINING ON {renderDateCreatedAt(appointment.createdAt)}</div>
            <div>
              Trainer: {appointment.trainer_id.name || appointment.trainer_id}
              <br></br>
              Session: {appointment.appt_id.session}
            </div>

            <div className='text-websecondary font-medium'>Exercise List</div>
            {appointment.list_of_exercises.map((item, index) => <>
              <div key={index}>{item.exercise_name}</div>
            </>)}
          </div>
          <div className='w-1/2 mt-20 flex flex-col gap-4'>
            <div className='text-websecondary font-medium'>Rating</div>
            {appointment.feedback.map((item, index) => <>
              <div className=' flex justify-between bg-blue-50 p-4 rounded-sm' key={index}>
                <div>{item.body_part}</div>
                <div className='flex flex-col items-end'>
                  {item.rating}
                  <div>{renderStars(transformRating(item.rating))}</div>
                </div>
              </div>
            </>)}

          </div>
        </div>
      </>}

    </div>

    //list of training history
    //model -> controller  (backend) -> route -> server route -> constant ->  action -> dispatch (frontend)
  )
}
