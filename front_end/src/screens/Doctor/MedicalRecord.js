import React, { useState, useEffect, useRef } from "react";
import Input from "../../pieces/Input/Input";
import Button from "../../pieces/Button/Button";
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import { list_exercises } from "../../actions/exerciseAction";
import { list_medicines } from "../../actions/medicineAction";
import Loader from "../../pieces/Loader/Loader";
import Message from "../../pieces/Message/Message";
import { update_health_record } from "../../actions/HRAction";
import { StringToDate } from "../../function/webFunction";
import LastAppointment from "./LastAppointment.js"


const MedicalRecord = () => {
  //note: khong lay id tu props ma lay tu user

  const { user } = useSelector((state) => state.userDetails);
  console.log("USERID", user._id)

  const { records } = useSelector((state) => state.healthrecordList);

  const {error} = useSelector((state)=> state.healthrecordUpdate);

  const latestRecord = records.reduce((prev, current) =>
    (prev.createdAt > current.createdAt) ? prev : current, records[0]);

  console.log("LATESTRECORD", latestRecord);


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(list_exercises())
    dispatch(list_medicines())
  }, [dispatch])

  const getToday = () => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    return `${day}/${month}/${year}`
  };

  //MEDICINE PRESCRIPTION
  const { medicines, error: medicineError, loading: medicineLoading } = useSelector((state) => state.medicineList)
  const medicineOptions = medicines?.map((medicine) => {
    return ({ value: medicine._id, label: medicine.medicine_name })
  })

  const [medicinePList, setMedicinePList] = useState([]); // medicine prescription list
  const [medicineInfo, setMedicineInfo] = useState([]);
  const [medicineValue, setMedicineValue] = useState();
  const [dosage, setDosage] = useState(1);
  const [frequency, setFrequency] = useState({
    morning: 0,
    afternoon: 0,
    evening: 0
  });
  console.log(frequency)
  const isAnyFrequencyFilled = () => {
    for (const key in frequency) {
      if (frequency[key] !== 0) {
        return true;
      }
    }
    return false;
  };
  const handleFrequencyChange = (item, value) => {
    if (value < 0) value = 0;
    setFrequency({
      ...frequency,
      [item]: value,
    });
  };

  const onMedicineChange = (e, { action }) => {
    // console.log(`selected ${e}`);
    if (action === "clear") setMedicineValue(null);
    if (e) {
      setMedicineValue(e);
      setMedicineInfo({ medicine_id: e.value, medicine_name: e.label });
    }
    else setMedicineInfo([])
  }

  const onSavePList = (e) => {
    e.preventDefault();
    if (dosage === "" || !isAnyFrequencyFilled || medicineInfo.length === 0) {
      alert("Please fill in all fields")
    }
    else {
      const newMedicine = { ...medicineInfo, ...{ dosage: dosage, frequency: frequency } }
      if (medicinePList.filter(medicine => medicine.medicine_id === newMedicine.medicine_id).length > 0) {
        alert("Medicine already exists in the list")
      } else {
        setMedicinePList([...medicinePList, newMedicine])
      }
    }
  }

  //EXERCISE PRESCRIPTION
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [showDate, setShowDate] = useState(days.map(day => {
    return {
      label: day,
      status: false
    }
  }))
  const [checked, setChecked] = useState(true); // check if user choose "Any days of the week" or not
  const [boxDisabled, setBoxDisabled] = useState(false);
  const [numberOfWeeks, setNumberOfWeeks] = useState(1)
  const [numberOfDays, setNumberOfDays] = useState(1); // number of days user choose
  const { exercises, error: exerciseError, loading: exerciseLoading } = useSelector((state) => state.exerciseList)
  const exercisesOptions = exercises?.map((exercise) => ({ value: exercise._id, label: exercise.name }))
  const [exerciseInfo, setExerciseInfo] = useState([]); // exercise prescription info
  const [exerciseValue, setExerciseValue] = useState();
  const [exercisePList, setExercisePList] = useState([]); // exercise prescription list

  useEffect(() => {
    setBoxDisabled(showDate.filter(day => day.status === true).length > 0)
  }, [showDate])

  const onCheck = () => {
    setChecked(!checked)
  }

  function onDisableDate(label) {
    if (boxDisabled && numberOfDays !== "") {
      let chosenDays = showDate.filter(day => day.status === true)
      return chosenDays.length === Number(numberOfDays) && chosenDays.filter(day => day.label === label).length === 0
    }
    else {
      return checked
    }
  }

  const onClickDate = (label, e) => {
    e.preventDefault();
    let updatedShowDate = showDate.map(day => {
      if (day.label === label) {
        let newStatus = !day.status
        return { label: label, status: newStatus }
      }
      else {
        return day
      }
    });
    setShowDate(updatedShowDate);
  }
  const onResetDate = (e) => {
    e.preventDefault();
    setShowDate(days.map(day => {
      return {
        label: day,
        status: false
      }
    }));
  }

  const onNumberDateChange = (number) => {
    if (Number(number) > days.length && number !== "") {
      alert(`Number of days must be less than ${days.length}`)
      setNumberOfDays(days.length.toString())
    } else if (Number(number) < 1 && number !== "") {
      alert("Number of days must be greater than 1")
      setNumberOfDays("1")
    }
    else setNumberOfDays(number)
  }

  const onNumberWeekChange = (number) => {
    if (Number(number) < 1 && number !== "") {
      alert("Number of days must be greater than 1")
      setNumberOfWeeks("1")
    }
    else setNumberOfWeeks(number)
  }



  const onExerciseChange = (e, { action }) => {
    // console.log(`selected exercise ${e}`);
    if (action === "clear") setExerciseValue(null);
    if (e) {
      setExerciseValue(e);
      setExerciseInfo({ exercise_id: e.value, exercise_name: e.label })
    }
    else setExerciseInfo([])
  }

  const onSaveExercise = (e) => {
    e.preventDefault()
    let chosenDays = showDate.filter(day => day.status === true)
    if (exerciseInfo.length === 0 || numberOfDays === "" || (!checked && chosenDays.length === 0)) {
      alert("Please fill in all fields")
    }
    else {
      const newExercise = { ...exerciseInfo, ...{ numberOfDays: numberOfDays, numberOfWeeks: numberOfWeeks, listOfDays: checked ? ["none"] : chosenDays.map(day => day.label) } }
      console.log(newExercise)
      if (exercisePList.filter(exercise => exercise.exercise_id === newExercise.exercise_id).length > 0) {
        alert("Exercise already exists in the list")
      } else {
        setExercisePList([...exercisePList, newExercise])
        setShowDate(days.map(day => {
          return {
            label: day,
            status: false
          }
        }));
        setNumberOfWeeks(1);
        setNumberOfDays(1);
        setExerciseValue(null);
      }
    }
  }


  //SUBMIT HEALTH RECORD
  const onSubmit = (e,id) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const medicineSendList = medicinePList.map(item => {
      const { medicine_name, ...rest } = item
      return rest
    })
    const exerciseSendList = exercisePList.map(item => {
      const { exercise_name, ...rest } = item
      return rest
    })
    const toSend = { ...formJson, medicineSendList, exerciseSendList }
    console.log(toSend)
    dispatch(update_health_record(id, toSend))
    if(!error) window.location.reload()
    

  }
  return (
    <div className='p-4 text-[14px]'>
      {/* Personal Information */}
      <div>
        <span className='block font-semibold text-2xl text-websecondary'>
          Patient Information
        </span>
        <div className='last:mb-4 mt-4 gap-2 flex flex-col'>
          <div className='flex gap-4'>
            <div className='w-1/3 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Full name
              </label>
              <span
                id='name'
                className='inline-block grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {user.name || 'Nguyen Van A'}
              </span>
            </div>
            <div className='w-1/6 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Gender
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {user.gender || 'Male'}
              </span>
            </div>
            <div className='w-1/3 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Date of birth
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {user.dob || '15/06/1969'}
              </span>
            </div>
            <div className='w-1/6 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Age
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {new Date().getFullYear() - StringToDate(user.dob).getFullYear() || "54"}
              </span>
            </div>
          </div>
          <div className='w-full flex items-center text-center'>
            <label htmlFor='name' className='mr-2 font-semibold'>
              Address
            </label>
            <span
              id='name'
              className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
            >
              {user.address || '54B Truong Chinh Street, Quarter 1, District 7, Ho Chi Minh City'}
            </span>
          </div>
          <div className='flex gap-4'>
            <div className='w-1/2 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Phone number
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {user.phone_number || '0123456789'}
              </span>
            </div>
            <div className='w-1/2 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Email
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                {user.email || 'nva@mail.com'}
              </span>
            </div>
          </div>
          <div className='flex gap-4'>
            <div className='w-1/3 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Has SSID?
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                Yes
              </span>
            </div>
            <div className='w-1/3 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                SSID Number
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                0010340700
              </span>
            </div>
            <div className='w-1/3 flex items-center text-center'>
              <label htmlFor='name' className='mr-2 font-semibold'>
                Date of expiry
              </label>
              <span
                id='name'
                className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2'
              >
                20/03/2024
              </span>
            </div>
          </div>
          <div className='w-full flex items-center text-center'>
            <label htmlFor='name' className='mr-2 font-semibold'>
              Note
            </label>
            <textarea
              id='name'
              className='inline-block  grow border-2 border-webprimary rounded-2xl py-1 px-2 h-[30vh] readonly'
            >
              It is important to consider various factors that can contribute to an increase in disease incidence. While I cannot provide a definitive answer without additional information, I can provide some suggestions to consider:
              1. Seasonal fluctuations: Certain diseases, such as flu and respiratory infections, are more common during certain times of the year. Seasonal changes in temperature, humidity, and sunlight can also affect disease incidence.
              2. Epidemiological events: Events such as outbreaks, natural disasters, and political changes can significantly impact disease incidence.
              3. Demographic shifts: Changes in the population structure, such as an increase in the elderly population or a decline in the birth rate, can contribute to changes in disease incidence.
              4. Geographic factors: Disease incidence can be influenced by factors such as population density, urbanization, and proximity to high-risk areas.
              5. Access to healthcare: Limited access to healthcare, particularly for chronic diseases, can contribute to increases in disease incidence.
              6. Environmental factors: Environmental factors such as air pollution, water quality, and pesticide exposure can affect disease incidence.
              7.Economic factors: Economic instability, such as job loss or income decline, can contribute to increased disease incidence as individuals may have limited access to healthcare or nutritious food.
              It is recommended to consult with local healthcare professionals and governmental health agencies for more accurate and up-to-date information on disease incidence in your specific region
            </textarea>
          </div>
        </div>
      </div>

      {/* Last Appointment */}
      {records > 1 && <LastAppointment />}
      {/* This Appointment */}
      {/*  Form */}
      <form onSubmit={(e) => onSubmit(e, latestRecord._id)}>
        <div>
          <span className='block font-semibold text-2xl text-websecondary'>
            This Appointment Result
          </span>
          Date of appointment: {getToday()}
          <div className='last:mb-4 mt-4 gap-2 flex flex-col'>
            <div className='flex gap-4'>
              <div className='w-1/4 flex items-center text-center grow'>
                <div className='w-full'>
                  <Input
                    text='Blood Type'
                    name='bloodtype'
                    state={latestRecord.bloodtype}
                    type={"text"}
                    placeholder='O+'
                  />
                </div>
              </div>
              <div className='w-1/4 flex items-center text-center'>
                <div className='w-full'>
                  <Input
                    text='Weight'
                    name='weight'
                    state={latestRecord.weight}
                    type={"text"}
                    placeholder='50kg'
                  />
                </div>
              </div>
              <div className='w-1/4 flex items-center text-center'>
                <div className='w-full'>
                  <Input
                    text='Height'
                    name='height'
                    state={latestRecord.height}
                    type={"text"}
                    placeholder='160cm'
                  />
                </div>
              </div>
              <div className='w-1/4 flex items-center text-center'>
                <div className='w-full'>
                  <Input
                    text='Blood Pressure'
                    name='bloodpressure'
                    state={latestRecord.bloodpressure}
                    type={"text"}
                    placeholder='160cc'
                  />
                </div>
              </div>
            </div>
            <div className='w-full flex items-center text-center'>
              <div className='w-full'>
                <Input
                  text='Symptoms'
                  name='symptoms'
                  type={"text"}
                  placeholder='Something....'
                />
              </div>
            </div>
            <div className='w-full flex items-center text-center'>
              <div className='w-full'>
                <Input
                  text='Diagnosis'
                  name='diagnosis'
                  type={"text"}
                  placeholder='Something....'
                />
              </div>
            </div>
            {medicines?.length === 0 || medicineLoading ? <Loader /> :
              medicineError ? <Message>{medicineError}</Message> :

                <div className='w-full flex items-center text-center'>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='border border-webgrey w-1/3'>Medicine</th>
                        <th className='border border-webgrey '>No.of days</th>
                        <th className='border border-webgrey '>Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-0'>
                          <Select isSearchable isClearable options={medicineOptions}
                            value={medicineValue}
                            onChange={onMedicineChange}></Select>
                        </td>
                        <td className='border-0'>
                          <Input
                            state={dosage}
                            setState={setDosage}
                            text
                            type={"number"}
                            placeholder='Enter dosage'
                          />
                        </td>
                        <td className='border-0'>
                          <div className="flex flex-col">
                            {['morning', 'afternoon', 'evening'].map((item, index) => (

                              <div key={index}>
                                {item}: <div className="flex justify-center items-center gap-4"><Input text state={frequency[item]} setState={(value) => handleFrequencyChange(item, value)} type='number' placeholder='Enter frequency' /> <p>pills</p> </div>
                              </div>))}
                          </div>
                        </td>
                        <td className='border-0 w-1/12'>
                          <Button onlyIcon='fa-solid fa-plus' type='primary' clickEvent={onSavePList}></Button>
                        </td>
                      </tr>
                      {medicinePList.map((item, index) => (
                        <tr key={index}>
                          <td className='border border-webgrey'>{item.medicine_name}</td>
                          <td className='border border-webgrey'>{item.dosage}</td>
                          <td className='border border-webgrey'>{Object.entries(item.frequency).map(([key, value])=>(` ${key}: ${value} pills,`))}</td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>
            }
            {exercises?.length === 0 || exerciseLoading ? <Loader /> :
              exerciseError ? <Message>{exerciseError}</Message> :
                <div className='w-full flex items-center text-center'>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='border border-webgrey '>Name</th>
                        <th className='border border-webgrey'>No.of weeks</th>
                        <th className='border border-webgrey w-1/12'>No. of days</th>
                        <th className='border border-webgrey w-1/3'>Choose days</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-0'>
                          <Select isSearchable escapeClearsValue
                            backspaceRemovesValue isClearable
                            value={exerciseValue}
                            options={exercisesOptions}
                            onChange={onExerciseChange}></Select>

                        </td>
                        <td className='border-0 w-1/12'>
                          <Input
                            text
                            placeholder='Enter number of weeks'
                            state={numberOfWeeks}
                            setState={onNumberWeekChange}
                            type={"number"}
                          />
                        </td>
                        <td className='border-0 w-1/12'>
                          <Input
                            text
                            placeholder='Enter number of dates'
                            state={numberOfDays}
                            setState={onNumberDateChange}
                            type={"number"}
                          />
                        </td>
                        <td className='border-0'>
                          <div className='flex flex-column'>
                            <div>
                              <div className='flex flex-column space-x-4 px-6'>
                                <input type='checkbox' checked={checked} disabled={boxDisabled}
                                  onChange={onCheck} />
                                <label>Any days of the week</label>
                              </div>
                              <div className="grid grid-cols-2">
                                {showDate.map((day, index) => (
                                  <Button key={index} type={day.status ? "primary" : "secondary"} disabled={onDisableDate(day.label)}
                                    clickEvent={(e) => onClickDate(day.label, e)}>
                                    {day.label}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            <Button type='primary' clickEvent={onResetDate}>Reset</Button>

                          </div>
                        </td>
                        <td className="border-0 w-1/12">
                          <Button type='primary' onlyIcon="fa-solid fa-plus" clickEvent={(e) => onSaveExercise(e)}></Button>
                        </td>
                      </tr>
                      {exercisePList.map((item, index) => (
                        <tr key={index}>
                          <td className='border border-webgrey w-2/5'>{item.exercise_name}</td>
                          <td className='border border-webgrey'>{item.numberOfWeeks}</td>
                          <td className='border border-webgrey'>{item.numberOfDays}</td>
                          <td className='border border-webgrey'>{
                            item.listOfDays.map((day, index) => (
                              <span key={index}>
                                {day === "none" ? "Any days" : day}
                                {(index < item.listOfDays.length - 1 && item.listOfDays.length > 1) && ","}
                              </span>
                            ))
                          }</td>
                        </tr>
                      ))
                      }

                    </tbody>
                  </table>
                </div>
            }
          </div>
        </div>
        {/* Button */}
        <div className='buttonBarr flex gap-4 justify-end'>
          <Button onlyIcon='fa-solid fa-cancel' type='secondary'></Button>
          <Button onlyIcon='fa-solid fa-save' type='submit'></Button>
        </div>
      </form>
    </div>

  );
};

export default MedicalRecord;

