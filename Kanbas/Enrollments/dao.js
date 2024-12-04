import Database from "../Database/index.js";
import model from "./model.js"

async function generateUniqueId(retryCount = 0) {
  if (retryCount >= 5) {
    throw new Error("Failed to generate a unique ID after multiple attempts.");
  }

  const randomId = Math.floor(1000 + Math.random() * 9000).toString(); // Generate random 4-digit ID

  // Check if the generated ID already exists
  const existingEnrollment = await model.findOne({ _id: randomId });
  if (existingEnrollment) {
    console.warn(`Duplicate ID (${randomId}) found, retrying...`);
    return generateUniqueId(retryCount + 1); // Retry if duplicate
  }

  return randomId; // Return unique ID
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

 export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
 }
 
 export async function enrollUserInCourse(user, course) {
  try {
    const _id = await generateUniqueId();
    const newEnrollment = await model.create({ _id, user, course, status: "ENROLLED" });
    console.log("New Enrollment Saved:", newEnrollment);
    return newEnrollment;
  } catch (error) {
    throw new Error(`Failed to enroll user: ${error.message}`);
  }
}


 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 
// Get all enrollments
export function getAllEnrollments() {
  return Database.enrollments;
}