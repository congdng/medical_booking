import { Schema, Types, model } from "mongoose";

const ExerciseInSession = Schema({
    exercise_id: {
        type: Types.ObjectId,
        ref: 'exercises'
    },
    exercise_status: {
        type: String,
        default: "not started"
    },
})
const PhysioAppointmentsSchema = Schema({
    exlist_id:{
        type: Types.ObjectId,
        ref: 'exerciselist'
    },
    patient_id: {
        type: Types.ObjectId,
        ref: 'users'
    },
    trainer_id: {
        type: Types.ObjectId,
        ref: 'trainers'
    },
    exercises: [ExerciseInSession],
    date: String,
    session: String,
    bookingStatus: String,
    price: Number,
    typeOfPayment: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email: String,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const PAppModel = model("physioappointments", PhysioAppointmentsSchema);

export default PAppModel;