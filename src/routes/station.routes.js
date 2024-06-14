import { Router } from "express";
import { createStation, deleteStation, getAllStations, getStation } from "../controllers/station.controller.js";

const router = Router()

router.route('/create-station').post(createStation)
router.route('/').get(getAllStations)
router.route('/:id').get(getStation)
router.route('/del/:id').get(deleteStation)
export default router