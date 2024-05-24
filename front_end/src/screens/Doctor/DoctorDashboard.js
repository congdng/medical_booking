import React, { useEffect, useState } from "react";
import Datepicker from "../../pieces/Datepicker/Datepicker";
import { timePeriod } from "../../constants/webconstant";
import Button from "../../pieces/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DOCTOR_UPDATE_RESET } from "../../constants/userConstant";
import { update_doctor } from "../../actions/userActions";
import moment from "moment";

const DoctorDashboard = () => {
  const [date, setDate] = useState();
  const [rangeTime, setRangeTime] = useState(timePeriod);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const doctorID = params.id;
  const doctorUpdate = useSelector((state) => state.doctorUpdate);
  const { loading, error, success } = doctorUpdate;
  useEffect(() => {
    if (success) {
      dispatch({ type: DOCTOR_UPDATE_RESET });
      history(`/doctor_dashboard/${doctorID}`);
    }
  }, [dispatch, history, success, doctorID]);

  let chooseTime = rangeTime;
  if (chooseTime && chooseTime.length > 0) {
    chooseTime.map((item) => {
      item.isSelected = true;
      return item;
    });
  }
  const handleClickTime = (item) => {
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((timePeriod) => {
        if (item.time === timePeriod.time)
          timePeriod.isSelected = !timePeriod.isSelected;
        return timePeriod;
      });
      setRangeTime(rangeTime);
    }
  };
  const submitHandler = () => {
    const working_hours = [];
    const format_date = moment(date).format("DD-MM-YYYY");
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectTime && selectTime.length > 0) {
        selectTime.map((span) => {
          let object = {};
          object.date = format_date;
          object.period = span.time;
          working_hours.push(object);
        });
      } else return;
    }
    dispatch(
      update_doctor({
        working_hours,
      })
    );
  };
  return (
    <div className='flex flex-col gap-8 w-full mb-5'>
      <div className='flex flex-col gap-4'>
        <label>Pick date</label>
        <Datepicker date={date} setDate={setDate} />
      </div>
      <div className='flex flex-col gap-4'>
        <label>Pick time</label>
        {rangeTime.map((item, index) => {
          return (
            <button
              className={`translate border-2 border-webprimary font-semibold  rounded-2xl hover:bg-websecondary hover:border-websecondary hover:text-webwhite disabled:bg-webgrey disabled:text-webwhite disabled:opacity-50 disabled:cursor-not-allowed disabled:border-0 ${
                item.isSelected
                  ? "bg-websecondary text-webwhite"
                  : "text-webprimary"
              }`}
              key={index}
              onClick={() => handleClickTime(item)}
            >
              {item.time}
            </button>
          );
        })}
      </div>
      <Button clickEvent={submitHandler}>Save</Button>
    </div>
  );
};

export default DoctorDashboard;
