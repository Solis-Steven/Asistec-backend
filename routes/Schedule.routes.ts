import express from "express";
import {
createActivity,
getUserActivity,
deleteActivity,
updateActivity,
deleteActivitiesByRelationId
} from "../controllers/Schedule.controller.ts";


const router = express.Router();
//route to create a new activity
router.post("/registerActivity/:id", createActivity);
router.get("/getActivities/:id", getUserActivity);
router.delete("/deleteActivity/:id/:activityId", deleteActivity);
router.delete("/deleteActivitiesByRelationId/:id/:idRelacion", deleteActivitiesByRelationId);
router.put("/updateActivity/:id", updateActivity);
export default router;
