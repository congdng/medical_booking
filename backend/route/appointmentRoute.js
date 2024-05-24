import express from "express";
import {
  delete_appointment,
  get_appointment_by_doctor,
  get_appointment_by_id,
  get_appointment_by_user,
  list_appointment,
  makeAppointment,
  update_appointment,
  update_appointment_paid,
} from "../controller/appointmentController.js";

const router = express.Router();
router.route("/").post(makeAppointment).get(list_appointment);
router.route("/:id/myOrder").get(get_appointment_by_user);
router.route("/:id/pay").put(update_appointment_paid);
router.route("/:id").get(get_appointment_by_id).put(delete_appointment);
router.route("/:id/update").put(update_appointment);
router.route("/doctor/:id").get(get_appointment_by_doctor)

export default router;
