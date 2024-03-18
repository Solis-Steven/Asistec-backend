import express from "express";
import {
createSchedule,
getUserSchedule,
updateSchedule,
deleteSchedule
} from "../controllers/Schedule.controller.ts";


const router = express.Router();
//route to create a new activity
router.post("/registerSchedule/:id", createSchedule);
router.get("/getSchedules/:id", getUserSchedule);
router.delete("/deleteSchedule/:id/:scheduleId", deleteSchedule);
router.put("/updateSchedule/:id", updateSchedule);
export default router;
