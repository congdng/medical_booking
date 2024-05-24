import express from "express";
import bcrypt from "bcryptjs";
import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    ethnic: { type: String, required: true },
    nationality: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "patient" },
    socialNumber: { type: String },
    image: String,
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
  // return (await enteredPassword) === this.password;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = model("users", userSchema);

export default userModel;
