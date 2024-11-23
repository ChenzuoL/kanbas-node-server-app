import Database from "../Database/index.js";

// Create a new assignment
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() }; // Generate a unique ID
    Database.assignments = [...Database.assignments, newAssignment]; // Add the new assignment
    console.log("Database after adding assignment:", Database.assignments); // Debugging log
    return newAssignment;
  }
  

// Find Assignments by courseId
export function findAssignmentForCourse(coursetId) {
    const{assignments} = Database;
    return assignments.filter((assignment) => assignment.course === coursetId)
}

// Find an assignment by its ID
export function findAssignmentById(assignmentId) {
    const { assignments } = Database;
    return assignments.find((assignment) => assignment._id === assignmentId);
  }

// Update an assignment by ID
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);

  if (!assignment) {
    throw new Error(`Assignment with ID ${assignmentId} not found`);
  }

  Object.assign(assignment, assignmentUpdates); // Merge updates into the existing assignment
  return assignment;
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

