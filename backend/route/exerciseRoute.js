import express from "express";
import { delete_exercise, get_exercise_by_id, list_exercises } from "../controller/exerciseController.js";

const router = express.Router();
router.route("/").get(list_exercises);
router.route("/:id").delete(delete_exercise).get(get_exercise_by_id)
export default router;


