import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  initialHour: { type: String, required: true },
  finalHour: { type: String, required: true },
  initialHourText: { type: String, required: true },
  finalHourText: { type: String, required: true },
  reminder: { type: Number, required: true },
  reminderText: { type: String, required: true },
  isAllDay: { type: Boolean, required: true },
  date: { type: String, required: true },
});

const daySchema = new mongoose.Schema({
  date: { type: String, required: true },
  events: [eventoSchema],
});

const eventCalendarSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "calendarioEventos" },
    eventItems: { type: Object, required: true, default: {} },
  },
  { timestamps: true, versionKey: false }
);

const EventSchema = mongoose.model("eventos", eventCalendarSchema);

export default EventSchema;
