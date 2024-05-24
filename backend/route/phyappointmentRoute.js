import express from "express";
import { apppointment_details, list_appointment, makeAppointment, update_phy_appointment_paid, update_status } from "../controller/physicalAppController.js";

const router = express.Router();
router.route("/").post(makeAppointment).get(list_appointment);
router.route("/:role/:id").get(list_appointment);
router.route("/:id").get(apppointment_details);
router.route("/:id/pay").put(update_phy_appointment_paid);
router.route("/:id/statusUpdate").put(update_status)

export default router;