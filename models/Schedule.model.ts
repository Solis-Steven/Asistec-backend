import { Document, Schema, model } from 'mongoose';
interface ISchedule extends Document {
  name : string;
  userId: string;


}
const ScheduleSchema = new Schema<ISchedule>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true }
  },
  { timestamps: true }

);
const Schedule = model<ISchedule>("Schedule", ScheduleSchema);
export default Schedule;