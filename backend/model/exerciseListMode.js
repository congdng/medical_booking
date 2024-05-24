import { Schema, Types, model } from "mongoose"

const ExerciseDetail = Schema({
    exercise_id: {
        type: Types.ObjectId,
        ref: 'exercises'
    },
    numberOfWeeks: String,
    numberOfDays: String,
    listOfDays: {
        type: [String]
    },
    numberOfDaysDone: { type: Number, default: 0 },


}, { timestamps: true })
const ELSchema = Schema({
    amount: String,
    description: String,
    exercises: { type: [ExerciseDetail] }
})

const ELModel = model('exerciselists', ELSchema)

export default ELModel;