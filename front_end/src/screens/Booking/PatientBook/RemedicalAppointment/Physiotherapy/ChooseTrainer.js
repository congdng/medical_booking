import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { list_trainers } from '../../../../../actions/userActions'
import Loader from '../../../../../pieces/Loader/Loader'
import Message from '../../../../../pieces/Message/Message'

function ChooseTrainer({setTrainer, nextStep}) {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(list_trainers())
  },[])
  const trainerList = useSelector((state) => state.trainerList)
  const { trainer, error, loading } = trainerList
  const onClick = (t) =>{
    console.log(t)
    setTrainer(t)
    nextStep()
  }
  
  const renderImageLink = (imageLink)=>{
    if (imageLink.startsWith('http')) return imageLink
    else {
      console.log(window.location.origin + '/uploads/assets/avatars/'+ imageLink)
      return window.location.origin + '/uploads/assets/avatars/'+ imageLink};
  }
  return (
    <>
    {loading? <Loader /> : error ? <Message>{error}</Message> :
    <div className='bg-blue-200 grid grid-cols-5 '>
      {trainer.map(t => {
      const user = t.user_id
      return(<div key={t._id} onClick={()=>onClick(t)}
        className='bg-webwhite flex flex-col justify-center items-center shadow-lg p-[10px] m-[10px] w-[150px] h-[250px]'
      >
          <img src={renderImageLink(t.imageLink)} /> {user.name}
        </div>)
      })}
      
      </div>}
    </>
  )
}

export default ChooseTrainer