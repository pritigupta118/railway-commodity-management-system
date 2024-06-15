import { Router } from "express";
import { createStation, deleteStation, getAllStations, getStation } from "../controllers/station.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/create-station').post(isAdmin , createStation)
router.route('/').get(getAllStations)
router.route('/:id').get(getStation)
router.route('/').delete(isAdmin , deleteStation)
export default router