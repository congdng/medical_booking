import React from 'react'
import useModal from '../../pieces/Modal/useModal'
import Modal from '../../pieces/Modal/Modal'
import Button from '../../pieces/Button/Button'
import { create_chat } from '../../actions/chatActions'

const DoctorAvailable = ({onlineList, func}) =>{
    console.log("ONLINE-LIST:", onlineList)
return(
    <>
    <h1>Choose a doctor to start</h1>

    {/* <div className="flex justify-center gap-8">
            <div className="grid grid-flow-col">
                <img src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg" width={200} height={200} alt="" />
                <span className='flex justify-center'>Doctor 1</span>
            </div>
            <div className="grid grid-flow-col">
                <img src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg" width={200} height={200} alt="" />
                <span className='flex justify-center'>Doctor 2</span>
            </div>
            <div className="grid grid-flow-col">
                <img src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg" width={200} height={200} alt="" />
                <span className='flex justify-center'>Doctor 3</span>
            </div>
    </div> */}
    {/* {onlineList?.length + " doctors"} */}
    <div>
    {onlineList?.length>0 ? onlineList.map(doctor =>
        <Button key= {doctor.id} clickEvent={()=>{
            func(doctor.id, 'patient')
        }}>{doctor.name}</Button>
    ): <>No doctor available</>}
    </div>
    </>
)
}


function NoConversations({role, onlineList, func}) {
    const {isShowing, toggle} = useModal()

  return (

    <div>
        {role === 'patient'?<>
        {"You have no conversations"} 
    <Button clickEvent={toggle}>Start chat</Button>
    <Modal isShowing={isShowing} hide={toggle} component={<DoctorAvailable onlineList={onlineList} func={func}/>}></Modal>
        </>:<>Waiting for chat...</>}
        
    </div>
  )
}

export default NoConversations