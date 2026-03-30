import express from "express";
import {bookAppointment,getMyAppointments,cancelAppointment} from "../controllers/appointmentController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, bookAppointment);
router.get("/", protect, getMyAppointments);
router.delete("/:id", protect, cancelAppointment);

export default router;