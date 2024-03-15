import express from "express";
import {
createActivity,
getScheduleActivity,
deleteActivity,
updateActivity,
} from "../controllers/Activity.controller.ts";


const router = express.Router();
//route to create a new activity
router.post("/registerActivity/:id", createActivity);
router.get("/getActivities/:id", getScheduleActivity);
router.delete("/deleteActivity/:id/:activityId", deleteActivity);
router.put("/updateActivity/:id", updateActivity);
export default router;
