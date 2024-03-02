import { Document, Schema, model } from 'mongoose';
interface IActivitySchedule extends Document {
  idRelacion: number;
  start: Date;
  end: Date;
  title: string;
  description: string;
  modalityType: string;
  color: string;
  type: string;
  day: number;
  userId: string;
}
const ActivitySchema = new Schema<IActivitySchedule>(
  {
    idRelacion: { type: Number, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    modalityType: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    day: { type: Number, required: true },
    userId: { type: String, required: true }
  },
  { timestamps: true }

);
const Activity = model<IActivitySchedule>("Activity", ActivitySchema);
export default Activity;