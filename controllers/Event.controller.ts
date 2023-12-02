import { Request, Response } from "express";
import EventSchema from "../models/Event.model.ts";

// This function returns all events
export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventSchema.find();
    res.json(events);
  } catch (error) {
    console.log("getEvents error", error);
  }
};

// This function returns an event by id
export const getEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await EventSchema.findById(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json(event);
  } catch (error) {
    console.log("getEvent error", error);
  }
};

// This function deletes an event by id
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await EventSchema.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json(event);
  } catch (error) {
    console.log("deleteEvent error", error);
  }
};

// This function updates an event by id
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { eventItems } = req.body;

  try {
    await EventSchema.findByIdAndUpdate(id, {
      eventItems: eventItems,
    });
    res.send("Updating event");
  } catch (error) {
    console.log("updateEvent error", error);
  }
};

// This function creates a new event
export const createEvent = async (req: Request, res: Response) => {
  const { _id, eventItems } = req.body;

  try {
    const existingEvent = await EventSchema.findById(_id);

    if (existingEvent) {

      res.status(400).send("El evento con este _id ya existe");
      return;
    }

    const newEvent = new EventSchema({
      _id,
      eventItems,
    });

    await newEvent.save();
    res.send("Creating event");
  } catch (error) {
    console.log("createEvent error", error);
  }
};
