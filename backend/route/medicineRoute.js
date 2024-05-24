import express from "express";
import { delete_medicine, get_medicine_by_id, list_medicines } from "../controller/medicineController.js";

const router = express.Router();
router.route("/").get(list_medicines);
router.route("/:id").delete(delete_medicine).get(get_medicine_by_id)
export default router;


