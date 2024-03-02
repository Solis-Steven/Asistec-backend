import { Document, Schema, model } from "mongoose";

interface IEvent extends Document {
  name: string;
  description: string;
  initialHour: string;
  initialHourText: string;
  finalHour: string;
  finalHourText: string;
  date: string;
  isAllDay: boolean;
  reminder: number;
  reminderText: string;
  userId: string;
}

const eventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  initialHour: {
    type: String,
    required: true
  },
  initialHourText: {
    type: String,
    required: true
  },
  finalHour: {
    type: String,
    required: true
  },
  finalHourText: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  isAllDay: {
    type: Boolean,
    required: true
  },
  reminder: {
    type: Number,
    required: true
  },
  reminderText: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }

}, {
  timestamps: true
});

const Event = model<IEvent>("Event", eventSchema);
export default Event;