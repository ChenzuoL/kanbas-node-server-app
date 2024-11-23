import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const assignment = req.body;
    try {
      const newAssignment = assignmentDao.createAssignment(assignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Retrieve a single assignment by ID
  app.get("/api/courses/:courseId/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = assignmentDao.findAssignmentById(aid);
    if (!assignment) {
      return res.status(404).json({ error: `Assignment with ID ${aid} not found` });
    }
    res.json(assignment);
  });

  // Retrieve all assignments for a courseId
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    try {
      const assignments = assignmentDao.findAssignmentForCourse(courseId);
      if (assignments.length === 0) {
        return res.status(404).json({ error: `No assignments found for courseId: ${courseId}` });
      }
      res.status(200).json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update an assignment by ID
  app.put("/api/assignments/:id", (req, res) => {
    const { id: assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const updatedAssignment = assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
      res.status(200).json(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(404).json({ error: error.message });
    }
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:id", (req, res) => {
    const { id: assignmentId } = req.params;
    try {
      const deletedAssignment = assignmentDao.deleteAssignment(assignmentId);
      res.status(200).json(deletedAssignment);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(404).json({ error: error.message });
    }
  });
}
