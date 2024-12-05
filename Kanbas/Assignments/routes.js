import * as assignmentDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Create a new assignment
  app.post("/api/assignments", async (req, res) => {
    try {
      const assignment = req.body;
      const newAssignment = await assignmentDao.createAssignment(assignment);
      res.status(201).json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Retrieve a single assignment by ID | tested
  app.get("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const assignment = await assignmentDao.findAssignmentById(id);
      if (!assignment) {
        return res.status(404).json({ error: `Assignment with ID ${id} not found` });
      }
      res.json(assignment);
    } catch (error) {
      console.error("Error retrieving assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Retrieve all assignments for a courseId | tested
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await assignmentDao.findAssignmentsForCourse(courseId);
      res.status(200).json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update an assignment by ID
  app.put("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedAssignment = await assignmentDao.updateAssignment(id, updates);
      if (!updatedAssignment) {
        return res.status(404).json({ error: `Assignment with ID ${id} not found` });
      }
      res.status(200).json(updatedAssignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAssignment = await assignmentDao.deleteAssignment(id);
      if (!deletedAssignment) {
        return res.status(404).json({ error: `Assignment with ID ${id} not found` });
      }
      res.status(200).json(deletedAssignment);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
