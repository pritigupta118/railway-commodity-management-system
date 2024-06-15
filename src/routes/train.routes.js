import { Router } from "express";
import { deleteTrain, getAllTrains, getTrain, newTrain } from "../controllers/train.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/add").post(isAdmin , newTrain)
router.route("/:id").get(getTrain)
router.route("/").get(getAllTrains)
router.route("/").delete(isAdmin , deleteTrain)

export default router