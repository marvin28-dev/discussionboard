import express from "express";
import { login,register,logout,forgotPassword, updatePassword } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/forgotPassword", forgotPassword)
router.post("/updatePassword", updatePassword)


export default router