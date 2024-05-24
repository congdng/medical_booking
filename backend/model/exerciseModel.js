import mongoose, { Schema, model } from "mongoose";

const ExerciseSchema = Schema({
  name: String,
  desc: String,
  category: String,
  price: Number,
  machine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "machines",
  },
});

const exerciseModel = model("exercises", ExerciseSchema);

export default exerciseModel;
