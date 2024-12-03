import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignDao from "../Assignments/dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.status(200).json(courses); // Send all courses to the client
    } catch (error) {
      console.error("Error fetching courses in route:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  // create a new module for the course
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    try {
      const newModule = modulesDao.createModule(module);
      console.log("New module added to course:", newModule); 
      res.status(201).json(newModule);
    } catch (error) {
      console.error("Error creating module:", error);
      res.status(500).json({ error: "Failed to create module" });
    }
  });
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  // create a new assignments for the course
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
  
    try {
      const newAssignment = assignDao.createAssignment(assignment);
      console.log("New assignment added:", newAssignment); // Debugging log
      res.status(201).json(newAssignment); // Use 201 Created status code
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
 
  
}

