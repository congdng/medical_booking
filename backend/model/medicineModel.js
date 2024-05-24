import { Schema, Types, model } from "mongoose";

const MedicineSchema = Schema({
  name: String,
  description: String,
  price: String,
});

const medModel = model("medicines", MedicineSchema);

export default medModel;
