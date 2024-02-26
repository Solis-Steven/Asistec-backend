import express from "express";
import {
    createUser,
    userLogin
} from "../controllers/User.controller.ts";

const router = express.Router();

router.post("/", createUser)
router.post("/login", userLogin)

export default router;