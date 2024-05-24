import mongoose, { Schema, model, Types } from "mongoose";

const HRSchema = Schema({

    height: String,
    weight: String,
    bloodtype: String,
    bloodpressure: String,
    note: String,
    diagnosis: String,
    symptoms: String,
    ptid: {
        type: Types.ObjectId,
        ref: 'users'
    },
    dtid: {
        type: Types.ObjectId,
        ref: 'doctors'
    },
    mlid: {
        type: Types.ObjectId,
        ref: 'medicinelists'
    },
    elid: {
        type: Types.ObjectId,
        ref: 'exerciselists'
    }

}, { timestamps: true })

const HRModel = model('healthrecord', HRSchema)

export default HRModel;