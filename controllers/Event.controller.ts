import { Request, Response } from "express";
import Event from "../models/Event.model.ts"
import User from "../models/User.model.ts"

export const createEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    const error = new Error("El usuario no existe");

    return (res.status(400).json({ msg: error.message }));
  }

  try {
    const eventData = req.body;
    const event = await Event.create(eventData);
    res.status(201).json({ msg: "Evento creado correctamente", event });
  } catch (error: any) {
    console.log("createEvent error", error);
    res.status(500).json({ msg: "Error al crear el evento" });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  if(id == undefined) res.status(404);

  const user = await User.findById({ _id: id });

  if (!user) {
    const error = new Error("El usuario no existe");

    return (res.status(400).json({ msg: error.message }));
  }

  try {
    const events = await Event.find({ userId: id });
    res.json(events);
  } catch (error: any) {
    console.log("getUserEvents error", error);
    res.status(500).json({ msg: "Error al obtener los eventos del usuario" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    const error = new Error("El usuario no existe");

    return (res.status(400).json({ msg: error.message }));
  }

  try {
    const eventId = req.params.id;
    const eventData = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
    res.json({ msg: "Evento actualizado correctamente", event: updatedEvent });
  } catch (error: any) {
    console.log("updateEvent error", error);
    res.status(500).json({ msg: "Error al actualizar el evento" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    const error = new Error("El usuario no existe");

    return (res.status(400).json({ msg: error.message }));
  }

  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.json({ msg: "Evento eliminado correctamente" });
  } catch (error: any) {
    console.log("deleteEvent error", error);
    res.status(500).json({ msg: "Error al eliminar el evento" });
  }
};
