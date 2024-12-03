import mongoose from "mongoose";
const enrollmentSchema = new mongoose.Schema(
 {
   course: { String, ref: "CourseModel" },
   user:   { String, ref: "UserModel"   },
   grade: Number,
   letterGrade: String,
   enrollmentDate: Date,
   status: {
     type: String,
     enum: ["ENROLLED", "DROPPED", "COMPLETED"],
     default: "ENROLLED",
   },
 },
 { collection: "enrollments" }
);
export default enrollmentSchema;