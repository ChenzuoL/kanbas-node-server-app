import AssignmentModel from "./model.js"; // Import the AssignmentModel

// Create a new assignment
export async function createAssignment(assignment) {
  try {
    const newAssignment = new AssignmentModel(assignment); // Use the imported model
    await newAssignment.save();
    return newAssignment;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
}

// Find Assignments by courseId
export async function findAssignmentsForCourse(courseId) {
  try {
    return await AssignmentModel.find({ course: courseId }); // Query using the model
  } catch (error) {
    console.error("Error finding assignments for course:", error);
    throw error;
  }
}

// Find an assignment by its ID
export async function findAssignmentById(assignmentId) {
  try {
    return await AssignmentModel.findById(assignmentId); // Query using the model
  } catch (error) {
    console.error("Error finding assignment by ID:", error);
    throw error;
  }
}

// Update an assignment by ID
export async function updateAssignment(assignmentId, assignmentUpdates) {
  try {
    return await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      assignmentUpdates,
      { new: true } // Return the updated document
    );
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
}

// Delete an assignment by ID
export async function deleteAssignment(assignmentId) {
  try {
    return await AssignmentModel.findByIdAndDelete(assignmentId); // Delete using the model
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
}
