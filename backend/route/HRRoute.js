
import express from "express";
import { createHealthRecord, getHealthRecord, saveHealthRecord, updateHealthRecord } from "../controller/HRController.js";
import { getPatientMedicineList } from "../controller/prescriptionListController.js";
const router = express.Router();

router.route("/save/:id").post(saveHealthRecord);
router.route("/update/:id").put(updateHealthRecord);
router.route("/patient/:id").get(getHealthRecord).post(createHealthRecord);
router.route("/med/:patient_id").get(getPatientMedicineList);

export default router;

