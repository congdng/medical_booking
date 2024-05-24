import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title ,CategoryScale} from "chart.js";
import { Chart } from 'react-chartjs-2';
import Loader from "../../../pieces/Loader/Loader";
import Message from "../../../pieces/Message/Message";
export const TrainingGraphScreen = () => {
  const list = useSelector((state) => state.exerciserecordList);
  const { loading, error, records } = list;
  const [text, setText] = useState("");
  const labels = []; 
  const datasets = {}; 

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function transformRating(fraction_string) {
    var parts = fraction_string.split('/');
    var numerator = parseInt(parts[0]); 
    return numerator
  }
 
  function transformData(dataArray) {

    dataArray.forEach(appointment => {
      const date = appointment.appt_id.date;
      if(labels.indexOf(date)===-1) labels.push(date); 

      const ratingsByBodyPart = {};

      appointment.feedback.forEach(entry => {
        const bodyPart = entry.body_part;
        const rating = transformRating(entry.rating);  
        ratingsByBodyPart[bodyPart] = rating;
      });

      Object.keys(ratingsByBodyPart).forEach(bodyPart => {
        if (!datasets[bodyPart]) {
          datasets[bodyPart] = {
            label: bodyPart,
            data: [], 
            borderColor: getRandomColor(), 
            fill: false 
          };
        }

        if (typeof ratingsByBodyPart[bodyPart] !== 'undefined') {
          datasets[bodyPart].data.push(ratingsByBodyPart[bodyPart]);
        } else {
          datasets[bodyPart].data.push(null);
        }
      });
    });
  }
  useEffect(()=>{
    if (records) {
      if (records.length > 0) {
        transformData(records)   
      } else{
        setText(text => "No training data available")
      }
    }
  }, [records])
  

  ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title,CategoryScale);

  const data = {
    labels: labels,
    datasets: Object.values(datasets),
  };

  return (
    <div>{loading? <Loader/>: error? <Message>{error}</Message>: <>{text}<Chart type="line" data={data} /></>}</div>

    // chen graph the hien qua trinh tien bo cua benh nhan, chia %
    // model -> controller  (backend) -> route -> server route -> constant ->  action -> dispatch (frontend)
    // lay graph tu file khac bo do =)))
  )
}
