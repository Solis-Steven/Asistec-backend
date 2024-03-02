import { Request, Response } from "express";
import Activity from "../models/Activity.model.ts"
import User from "../models/User.model.ts"

export const createActivity = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById({ _id: id });

  if (!user) {
    const error = new Error("El usuario no existe");

    return (res.status(400).json({ msg: error.message }));
  }

  try {
    const activityData = req.body;
    const activity = await Activity.create(activityData);
    res.status(201).json({ msg: "Actividad creado correctamente", activity });
  } catch (error: any) {
    console.log("createActivity error", error);
    res.status(500).json({ msg: "Error al crear la Actividad" });
  }
};
export const getUserActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if(id == "undefined") return;
  
    const user = await User.findById({ _id: id }).select('-updatedAt -__v -createdAt');
  
    if (!user) {
      const error = new Error("El usuario no existe");
  
      return (res.status(400).json({ msg: error.message }));
    }
  
    try {
      const activities = await Activity.find({ userId: id });
      res.json(activities);
    } catch (error: any) {
      console.log("getUserActivity error", error);
      res.status(500).json({ msg: "Error al obtener las Actividades del usuario" });
    }
  };
  
  export const updateActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await User.findById({ _id: id });
  
    if (!user) {
      const error = new Error("El usuario no existe");
  
      return (res.status(400).json({ msg: error.message }));
    }
  
    try {
      const activityData = req.body;
      const updatedActivity = await Activity.findByIdAndUpdate(activityData["_id"], activityData, { new: true });
      res.json({ msg: "Actividad actualizada correctamente", event: updatedActivity });
    } catch (error: any) {
      console.log("updateEvent error", error);
      res.status(500).json({ msg: "Error al actualizar la actividad" });
    }
  };
  
  export const deleteActivity = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await User.findById({ _id: id });
  
    if (!user) {
      const error = new Error("El usuario no existe");
  
      return (res.status(400).json({ msg: error.message }));
    }
  
    try {
      const activityId = req.params.activityId;
      await Activity.findByIdAndDelete({_id: activityId});
      res.json({ msg: "Evento eliminado correctamente" });
    } catch (error: any) {
      console.log("deleteEvent error", error);
      res.status(500).json({ msg: "Error al eliminar el evento" });
    }
  };
  export const deleteActivitiesByRelationId = async (req: Request, res: Response) => {
    const { id, idRelacion } = req.params;

    const user = await User.findById({ _id: id });

    if (!user) {
        const error = new Error("El usuario no existe");
        return res.status(400).json({ msg: error.message });
    }

    try {
        await Activity.deleteMany({ idRelacion: idRelacion });
        res.json({ msg: "Actividades eliminadas correctamente" });
    } catch (error: any) {
        console.log("deleteActivitiesByRelationId error", error);
        res.status(500).json({ msg: "Error al eliminar las actividades" });
    }
};
 
  