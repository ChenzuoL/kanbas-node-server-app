import Database from "../Database/index.js";
import model from "./model.js"
function generateRandomId(length = 3) {
  return Math.random().toString().slice(2, 2 + length); // Generate a random numeric string
}
// Function to generate a unique random string number
async function generateUniqueRandomId(prefix = "M", length = 3) {
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

export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
  // const { modules } = Database;
  // const module = modules.find((module) => module._id === moduleId);
  // Object.assign(module, moduleUpdates);
  // return module;
 }
  
export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
   }   
   export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
   }
   

export async function createModule(module) {
  try {
    if (!module._id) {
      // Generate a unique `_id` if not provided
      module._id = await generateUniqueRandomId("M", 3); // Prefix "M" and 3 random digits
    }

    const newModule = await model.create(module); // Save the module to the database
    return newModule; // Return the newly created module
  } catch (error) {
    console.error("Error creating module in DAO:", error.message);
    throw error;
  }
}
  

// Delete an assignment by ID
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  const index = assignments.findIndex((assignment) => assignment._id === assignmentId);

  if (index === -1) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  const [deletedAssignment] = assignments.splice(index, 1); // Remove the assignment
  return deletedAssignment;
}

  
