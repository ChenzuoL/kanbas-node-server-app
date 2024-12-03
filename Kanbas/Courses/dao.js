import Database from "../Database/index.js";
import model from"./model.js"

function generateRandomId(length = 3) {
  return Math.random().toString().slice(2, 2 + length); // Generate a random numeric string
}
// Function to generate a unique random string number
async function generateUniqueRandomId(prefix = "RS", length = 3) {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const randomNumber = generateRandomId(length); // Generate random 3-digit number
    uniqueId = `${prefix}${randomNumber}`; // Combine prefix with random number
    const existingRecord = await model.findOne({ _id: uniqueId }); // Check if it exists
    if (!existingRecord) {
      isUnique = true; // Ensure ID is unique
    }
  }

  return uniqueId; // Return the unique ID
}

export function findAllCourses() {
  return model.find();
} 
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}
export async function createCourse(course) {
  try {
    // Assign a unique random string ID if `_id` is not provided
    if (!course._id) {
      course._id = await generateUniqueRandomId("RS", 3); // Generate a 3-digit unique ID
    }

    const newCourse = await model.create(course);
    return newCourse;
  } catch (error) {
    console.error("Error creating course in DAO:", error.message);
    throw error;
  }
}


export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export async function updateCourse(courseId, courseUpdates) {
  try {
    const result = await model.updateOne({ _id: courseId }, { $set: courseUpdates });
    return result;
  } catch (error) {
    console.error("Error updating course in DAO:", error.message);
    throw error; // Let the route handler catch the error
  }
}

