import { Router } from "express";
import { deleteTrain, getAllTrains, getTrain, newTrain } from "../controllers/train.controller.js";

const router = Router()

router.route("/add").post(newTrain)
router.route("/:id").get(getTrain)
router.route("/").get(getAllTrains)
router.route("/").delete(deleteTrain)

export default router