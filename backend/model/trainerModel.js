import mongoose, { Schema, model } from "mongoose";


const trainerSchema = Schema({

  name:String,
  department: String,
  experience: String,
  imageLink: String,
  language: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
 
});
const trainerModel = model("trainers", trainerSchema);

export default trainerModel;
