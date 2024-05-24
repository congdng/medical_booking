const ChatListDetail = ({ imageLink, name, time, text, isClickedon, received, seenAndReceived }) => {
    const bgtext = isClickedon ? ' bg-webthird  text-websecondary' : 'hover:bg-grey-lighter text-black'
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
            <GreenTick seenAndRecieved={seenAndReceived} received={received} />
            {time}
          </span>
        </div>
        <div className='text-sm text-grey-800 truncate'>
          <span>
            <span className={isClickedon ? 'text-blue-800' : ' '}>{text}</span>
          </span>
        </div>
      </div>
    </li>)
  }
  
  export default ChatListDetail;