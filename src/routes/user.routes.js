import { Router } from "express";
import { getAllUsers, getCurrentUser, getUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refreshToken").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)

router.route("/:id").get(verifyJWT,getUser)
router.route("/").get( isAdmin ,getAllUsers)
export default router