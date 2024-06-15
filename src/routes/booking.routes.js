import { Router } from "express";
import { createBooking, deleteBookingById, getAllBookings, getBookingById } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/book").post(verifyJWT , createBooking)
router.route("/").get(verifyJWT , getAllBookings)
router.route("/:id").get(verifyJWT, getBookingById)
router.route("/").delete(verifyJWT,deleteBookingById)

export default router