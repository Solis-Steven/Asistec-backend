import mongoose from 'mongoose';

const CourseScheduleSchema = new mongoose.Schema({
  id: Number,
  idRelacion: Number,
  startDate: Date,
  endDate: Date,
  title: String,
  professorName: String,
  location: String,
  modalityType: String,
  color: String,
  type: String,
  day: Number
});

export default mongoose.model('CourseSchedule', CourseScheduleSchema);