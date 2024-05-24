import mongoose, { Schema, Types, model } from "mongoose";

const MachineSchema = Schema({
  _id: Types.ObjectId,
  name: String,
  description: String,
  setUpTime: String,
  clinicid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clinics",
  },
});

const machineModel = model("machines", MachineSchema);

export default machineModel;
