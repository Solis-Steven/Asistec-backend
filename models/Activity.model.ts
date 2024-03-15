import { Document, Schema, model } from 'mongoose';
interface IActivitySchedule extends Document {
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  modalityType: string;
  color: string;
  day: number;
  scheduleId: string;

}
const ActivitySchema = new Schema<IActivitySchedule>(
  {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    modalityType: { type: String, required: true },
    color: { type: String, required: true },
    day: { type: Number, required: true },
    scheduleId: { type: String, required: true }
  },
  { timestamps: true }

);
const Activity = model<IActivitySchedule>("Activity", ActivitySchema);
export default Activity;