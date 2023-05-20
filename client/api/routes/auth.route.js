import express from "express";
import { register, login, logout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", (req, res) => {
    console.log(req.cookies.accessToken);
    login(req, res);
  });
router.post("/logout", logout)



export default router;
