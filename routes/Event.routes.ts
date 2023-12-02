import express from "express";
import {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getEvent,
} from "../controllers/Event.controller.ts";
import { validateSchema } from "../middlewares/validator.middleware.ts";
import { eventSchema, eventSchemaUpdate } from "../schemas/event.schema.ts";
const router = express.Router();

//route to create a new event
router
  .route("/registerEvent")
  //validateSchema middleware is used to validate the request body
  .post(validateSchema(eventSchema), createEvent);
//route to get all events
router.route("/getEvents").get(getEvents);
//route to get a single event
router.route("/getEvent/:id").get(getEvent);
//route to delete a single event
router.route("/deleteEvent/:id").delete(deleteEvent);
//route to update a single event
router
  .route("/updateEvent/:id")
  //validateSchema middleware is used to validate the request body
  .put(validateSchema(eventSchemaUpdate), updateEvent);

export default router;
