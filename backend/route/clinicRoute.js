import express from "express";
import { create_clinic, delete_clinic, get_clinic_by_id, list_clinics, update_clinic } from "../controller/clinicController.js";

const router = express.Router();
router.route("/").get(list_clinics).post(create_clinic);
router.route("/:id").delete(delete_clinic).get(get_clinic_by_id).put(update_clinic)
export default router;


