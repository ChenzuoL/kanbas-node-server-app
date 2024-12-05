import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: { type: String},
  title: { type: String },
  course: { type: String, ref: "CourseModel", required: true },
  description: { type: String },
  dueDate: { type: Date },
}, { collection: "assignments" }); // Specify the collection name explicitly if needed

export default assignmentSchema;
