import React from 'react'
import Button from '../../../../../pieces/Button/Button'

const Symptoms = ({symptoms, setSymptoms, nextStep}) => {
  return (
    <div className="flex flex-col">
      Tell your symptoms
      <textarea value={symptoms} onChange={(e)=> { 
        setSymptoms(e.target.value)
      }} rows={4} cols={50} className="border"></textarea>    
      {symptoms && <Button clickEvent={()=>nextStep()}>Next</Button>}
      </div>
  )
}

export default Symptoms