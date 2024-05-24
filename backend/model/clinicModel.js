import mongoose, { Schema, model } from "mongoose";
const clinicSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  special: { type: String },
});
const clinicModel = model("clinics", clinicSchema);

export default clinicModel;
