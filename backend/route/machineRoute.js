import express from "express";
import { delete_machine, get_machine_by_id, list_machines } from "../controller/machineController.js";

const router = express.Router();
router.route("/").get(list_machines);
router.route("/:id").delete(delete_machine).get(get_machine_by_id)
export default router;


