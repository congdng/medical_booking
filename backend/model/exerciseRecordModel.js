import { Schema, Types, model } from "mongoose"

const ExerciseInSession = Schema({
    exercise_name: String,
    exercise_id: {
        type: Types.ObjectId,
        ref: "exercises"
    },
})

const FeedBack = Schema({
    body_part: String,
    rating: String,
})

const ExerciseRecord = Schema({

    appt_id:{
        type: Schema.Types.ObjectId,
        ref: 'physioappointments'
    },
    list_of_exercises: [ExerciseInSession],
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    feedback: [FeedBack],
    advice: String,
    trainer_id:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
}, {timestamps: true})

export const ERModel = model("exerciserecords", ExerciseRecord);



