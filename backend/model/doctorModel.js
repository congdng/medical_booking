import mongoose, { Schema, model } from "mongoose";

const reviewSchema = Schema(
  {
    name: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const workingHourSchema = Schema({
  date: String,
  period: String
});

const doctorSchema = Schema({
  name: String,
  title: String,
  degree: String,
  experience: String,
  description: String,
  language: String,
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clinics",
  },
  workingHours: [workingHourSchema],
  reviews: [reviewSchema],
});
const doctorModel = model("doctors", doctorSchema);

export default doctorModel;
