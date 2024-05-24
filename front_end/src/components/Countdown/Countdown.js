import React, { useEffect, useState } from 'react'

const Countdown = ({initialTime, active, callback = ()=>{}, interval = 1000}) => {

    const getTimeLeft = () => {
        return time;
    };
    const [time, setTime] = useState(initialTime);
    const minutes = Math.floor((time/1000)/60);
    const seconds = (time/1000)%60;
    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value;
      };
    
    useEffect(() => {
        let timer = null
        if (active && time > 0) {
            timer = setInterval(() => {
                setTime(time => time - interval)
            }, interval)
        }
        if(time===0) callback()
        return () => {
            clearInterval(timer)
        }
    })

    return (
        <div>{formatTime(minutes)}:{formatTime(seconds)}</div>
    )
}

export default Countdown