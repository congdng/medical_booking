import express from "express";
import {
  accountActivation,
  list_users,
  login,
  register,
  delete_user,
  get_user_by_id,
  update_user,
  register_as_admin,
  get_doctor_by_id,
  list_doctors,
  reviewDoctor,
  update_doctor,
  list_doctors_by_clinic,
  list_trainers,
  delete_staff,
  register_staff_as_admin,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin, doctor } from "../middleware/roleMiddleWare.js";

const router = express.Router();
router.route("/").get(protect, admin, list_users);
router.post("/login", login);
router.post("/register", register);
router.post("/admin_register", protect, admin, register_as_admin);
router.post("/account_activation", accountActivation);
router.route("/doctor").get(list_doctors);
router.route("/doctor/:id").get(get_doctor_by_id).put(update_doctor);
router.route("/:id/reviews").post(protect, reviewDoctor);
router.route("/trainer").get(list_trainers)
router.route("/trainer/:id").post(protect,admin,register_staff_as_admin).delete(protect, admin, delete_staff)

router
  .route("/:id")
  .delete(protect, admin, delete_user)
  .get(get_user_by_id)
  .put(protect, admin, update_user);
export default router;
