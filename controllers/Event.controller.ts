import { Request, Response } from "express";
import EventSchema from "../models/Event.model.ts";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await EventSchema.find();
    res.json(events);
  } catch (error) {
    console.log("getEvents error", error);
  }
};

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
