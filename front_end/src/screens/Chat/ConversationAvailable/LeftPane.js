import React from 'react'
import { useSelector } from 'react-redux'
import { renderDate } from '../../../function/webFunction'


const MsgPersonal = ({ imageLink, name, time, text, isClickedon, received, seenAndReceived }) => {
  const bgtext = isClickedon ? ' bg-gray-200  text-websecondary' : 'hover:bg-gray-50 text-black'
  return (<li className={`flex flex-no-wrap items-center ${bgtext} cursor-pointer p-3`}>
    <div
      className='flex-no-shrink w-12 h-12 bg-no-repeat bg-center bg-contain rounded-full mr-3'
      style={imageLink && {
        backgroundImage: `url(${imageLink})`,
      }}
    ></div>
    <div className='flex-1 min-w-0'>
      <div className='flex justify-between mb-1'>
        <h2 className='font-semibold text-sm'>{name}</h2>
        <span className='text-sm text-grey-500'>
          {/* <GreenTick seenAndRecieved={seenAndReceived} received={received} /> */}
          {time}
        </span>
      </div>
      <div className='text-sm text-gray-800 truncate'>
        <span>
          <span className={isClickedon ? 'text-blue-800' : ' '}>{text}</span>
        </span>
      </div>
    </div>
  </li>)
}


const MsgNav = ({ convoArray, prf, activeTab, setActiveTab }) => {

  console.log(convoArray)
  const textExample = "You:  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab quam perferendisnihil beatae, et accusamus voluptate quod sednecessitatibus ea provident! Ducimus consequunturexercitationem cupiditate possimus consequatur suntdignissimos voluptas?"

  let getMessageOwner =  (user_id)=>{
     let name = user_id?.name
     let id = user_id?._id
     
     let ownerName = ""
     if (name) {
      
      if (id === prf.user_id){
        ownerName = "You"
      }
      else {
        let nameArray = name.split(' ')
        ownerName = nameArray[nameArray.length - 1]
      }
     }
    
      return ownerName;
  } 
  if (!convoArray) {
    return (<div>Loading...</div>)
  }
  return (<ul className='flex flex-col  w-full list-reset select-none'>
    
    {/* <MsgPersonal imageLink="https://randomuser.me/api/portraits/women/33.jpg" name="User 1" 
    text={textExample} isClickedon={true} time="Tue"/>
    <MsgPersonal imageLink="https://randomuser.me/api/portraits/men/46.jpg" name="User 3" 
    text={textExample} isClickedon={false} time="08.06.2023"/> */}

    {/* {convoArray && Object.entries(convoArray).map(([key, value], index) => (
      <div key={key} onClick={() => {
        setActiveTab(index)
      }}>
        <MsgPersonal imageLink="https://randomuser.me/api/portraits/men/46.jpg"
          name={prf.role === 'patient' ? value.dtid?.user_id?.name : value.pid?.user_id?.name}
          text={getMessageOwner(value.last_mess?.user_id)+": "+ value.last_mess?.text} isClickedon={activeTab === index} time={renderDate(value.date_created)}/>

      

      </div>
    ))} */}
    {convoArray.map((convo, index) => <div key={convo._id} onClick={() => {
        setActiveTab(index)
      }}>
        <MsgPersonal imageLink="https://randomuser.me/api/portraits/men/46.jpg"
          name={prf.role === 'patient' ? convo.dtid.name : convo.pid.name}
          text={""} isClickedon={activeTab === index} time={renderDate(convo.createdAt)}/>

      

      </div>)}
  </ul>)
};
const LeftPane = ({activeTab, setActiveTab}) => {
  const { chatList } = useSelector((state) => state.chatListGET);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div className='flex flex-wrap items-start content-start border-r border-grey-lighter h-full text-web'>
      {/* <SearchBar /> */}
      <MsgNav convoArray={chatList} prf={userInfo} setActiveTab={setActiveTab} activeTab={activeTab} />
    </div>
  )
}



export default LeftPane