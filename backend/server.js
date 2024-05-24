import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/connectDB.js";
import userRoute from "./route/userRoute.js";
import clinicRoute from "./route/clinicRoute.js";
import appointmentRoute from "./route/appointmentRoute.js";
import phyappointmentRoute from "./route/phyappointmentRoute.js";
import machineRoute from "./route/machineRoute.js";
import medicineRoute from "./route/medicineRoute.js";
import exerciseRoute from "./route/exerciseRoute.js";
import HRRoute from "./route/HRRoute.js";
import ERRoute from "./route/ERRoute.js";
import { userAvaUpload } from "./config/multerFile.js";
import path from "path";

dotenv.config();
await connectDB();
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
if ((process.env.NODE_ENV = "development")) {
  app.use(
    cors({
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
}

// Routes
app.use("/api/users", userRoute);
app.use("/api/clinics", clinicRoute);
app.use("/api/appointments", appointmentRoute);
app.use("/api/phyapp", phyappointmentRoute);
app.use("/api/machines", machineRoute);
app.use("/api/medicines", medicineRoute);
app.use("/api/exercises", exerciseRoute);
app.use("/api/healthrecord", HRRoute)
app.use("/api/exrecord", ERRoute)
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(path.join(__dirname, "/uploads"));
app.post("/api/avatarUpload", userAvaUpload.single('avatar'), (req, res) => {
  console.log(req.file)
  res.send(req.file)
})

// Connect
const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server runs on ${PORT}`);
});
