
import express from "express";
import { getERFromAppDetail, getExerciseRecord, saveExerciseRecord } from "../controller/HRController.js";
const router = express.Router();

router.route("/save/:id").post(saveExerciseRecord);
router.route("/appt/:id").get(getERFromAppDetail);
router.route("/patient/:id").get(getExerciseRecord);
export default router;

