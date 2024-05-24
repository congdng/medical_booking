import React, { useEffect } from 'react'
import { ExerciseOptions } from '../../../../../components/BookingContainer/BookingOptions'
import {useDispatch, useSelector} from "react-redux"
import { health_record_list } from '../../../../../actions/HRAction'
import Loader from '../../../../../pieces/Loader/Loader'
import Message from '../../../../../pieces/Message/Message'
export const ExerciseAssigned = ({nextStep, setExercises, setExerciseListId}) => {
  const dispatch= useDispatch()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

useEffect(()=>{
  dispatch(health_record_list(userInfo._id));
},[])

  const {loading, error, getData}= useSelector((state) => state.healthrecordUpdate);
  const exercises = getData?.data[0].elid.exercises
  console.log(exercises)
  const chooseExercises = (e, selectedOptions) =>{
    console.log(selectedOptions)
    setExercises(selectedOptions)
    setExerciseListId(getData.data[0].elid._id)
    nextStep()
  }
  return (
    <div>{loading? <Loader/>: 
    error?<Message>{error}</Message>:
    <ExerciseOptions options={exercises} func={chooseExercises}/>} </div>
  )
}
