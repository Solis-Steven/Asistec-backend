import { Request, Response } from "express";
import Schedule from "../models/Schedule.model.ts"
import User from "../models/User.model.ts"

export const createSchedule = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = await User.findById({ _id: id });
  
    if (!user) {
      const error = new Error("El usuario no existe");
  
      return (res.status(400).json({ msg: error.message }));
    }
  
    try {
      const scheduleData = req.body;
      const schedule = await Schedule.create(scheduleData);
      res.status(201).json({ msg: "Horario creado correctamente", schedule });
    } catch (error: any) {
      console.log("createSchedule error", error);
      res.status(500).json({ msg: "Error al crear el horario" });
    }
  };



  export const getUserSchedule = async (req: Request, res: Response) => {
      const { id } = req.params;
      
      if(id == "undefined") return;
    
      const user = await User.findById({ _id: id }).select('-updatedAt -__v -createdAt');
    
      if (!user) {
        const error = new Error("El usuario no existe");
    
        return (res.status(400).json({ msg: error.message }));
      }
    
      try {
        const schedules = await Schedule.find({ userId: id });
        res.json(schedules);
      } catch (error: any) {
        console.log("getUserSchedule error", error);
        res.status(500).json({ msg: "Error al obtener los horarios del usuario" });
      }
    };
    
    export const updateSchedule = async (req: Request, res: Response) => {
      const { id } = req.params;
    
      const user = await User.findById({ _id: id });
    
      if (!user) {
        const error = new Error("El usuario no existe");
    
        return (res.status(400).json({ msg: error.message }));
      }
    
      try {
        const scheduleData = req.body;
        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleData["_id"], scheduleData, { new: true });
        res.json({ msg: "Horario actualizado correctamente", event: updatedSchedule });
      } catch (error: any) {
        console.log("updateSchedule error", error);
        res.status(500).json({ msg: "Error al actualizar el horario" });
      }
    };
    
    export const deleteSchedule = async (req: Request, res: Response) => {
      const { id } = req.params;
    
      const user = await User.findById({ _id: id });
    
      if (!user) {
        const error = new Error("El usuario no existe");
    
        return (res.status(400).json({ msg: error.message }));
      }
    
      try {
        const scheduleId = req.params.scheduleId;
        await Schedule.findByIdAndDelete({_id: scheduleId});
        res.json({ msg: "Horario eliminado correctamente" });
      } catch (error: any) {
        console.log("deleteSchedule error", error);
        res.status(500).json({ msg: "Error al eliminar el horario" });
      }
    };

   
    