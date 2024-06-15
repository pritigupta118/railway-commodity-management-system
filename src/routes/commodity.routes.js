import { Router } from "express";
import { createCommodity, deleteCommodity, getAllCommodities, getCommodity } from "../controllers/commodity.controller.js";

const router = Router()

router.route("/create-commodity").post(createCommodity)
router.route("/").get(getAllCommodities)
router.route("/:id").get(getCommodity)
router.route('/del/:id').get(deleteCommodity)

export default router