import express from "express";
import {
  createEvent,
  getUserEvents,
  deleteEvent,
  updateEvent,
} from "../controllers/Event.controller.ts";
const router = express.Router();

//route to create a new event
router.post("/registerEvent/:id", createEvent);
router.get("/getEvents/:id", getUserEvents);
router.delete("/deleteEvent/:id/:eventId", deleteEvent);
router.put("/updateEvent/:id", updateEvent);

export default router;
