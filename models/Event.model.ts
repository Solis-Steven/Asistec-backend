import mongoose from "mongoose";

// This is the schema for the events
const eventCalendarSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "calendarioEventos" },
    eventItems: { type: Object, required: true, default: {} },
  },
  { timestamps: true, versionKey: false }
);

// This is the model for the events
const EventSchema = mongoose.model("eventos", eventCalendarSchema);

export default EventSchema;
