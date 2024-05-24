import mongoose, { Schema } from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    date: String,
    patient_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    clinic_id: {
      type: Schema.Types.ObjectId,
      ref: "clinics",
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "doctors",
    },
    symptoms: String,
    session: String,
    bookingStatus: String,
    reMedical: Schema.Types.Boolean,
    name: String,
    phoneNumber: String,
    email: String,
    dob: String,
    address: String,
    typeOfPayment: String,
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email: String,
    },
    price: Number,
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const apptModel = mongoose.model("appointments", appointmentSchema);

export default apptModel;
