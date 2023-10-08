import express from "express";
import {
    createUser,
    userLogin
} from "../controllers/User.controller.ts";

const router = express.Router();

router.route("/")
    .post(createUser)
    .get(userLogin)

export default router;