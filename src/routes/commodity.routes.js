import { Router } from "express";
import { createCommodity, deleteCommodity, getAllCommodities, getCommodity } from "../controllers/commodity.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create-commodity").post(isAdmin , createCommodity)
router.route("/").get(getAllCommodities)
router.route("/:id").get(getCommodity)
router.route('/').delete(isAdmin, deleteCommodity)

export default router