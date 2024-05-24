import React, { useState } from 'react'
import { ExerciseAssigned } from './ExerciseAssigned'
import { ChooseHour } from './ChooseHour'
import ChooseTrainer from './ChooseTrainer'
import ConfirmScreen from '../../ConfirmScreen'
import Complete from '../../Complete'

export const PhysiotherapyScreen = () => {
    const [step, setStep] = useState(0)
    const nextStep = () => {
        setStep(step + 1)
      }
    const [exerciseListId, setExerciseListId] = useState("")
    const [exercises, setExercises] = useState([])
    const [date, setDate] = useState("")
    const [hour, setHour] = useState("")
    const [trainer, setTrainer] = useState()

    const stepList = [
        <ExerciseAssigned nextStep={nextStep} setExercises={setExercises} setExerciseListId={setExerciseListId}/>,
        <ChooseHour nextStep={nextStep}  setDateString={setDate}
        hour={hour} setHour={setHour}/>,
        <ChooseTrainer setTrainer={setTrainer} nextStep={nextStep}/>,
        <ConfirmScreen data={
            {
                type: 'training',
                exercises,
                exerciseListId,
                date: date,
                hour: hour,
                trainer: trainer
            }
        } nextStep={nextStep}/>,
        <Complete/>

    ]
  return (
    <div className="flex justify-center mx-auto">{stepList[step]}</div>
  )
}
