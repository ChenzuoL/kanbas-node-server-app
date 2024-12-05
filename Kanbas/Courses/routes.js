import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

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
  // Create a new assignment for the course
app.post("/api/courses/:courseId/assignments", async (req, res) => {
  const { courseId } = req.params;

  // Assignment data, ensure `course` is tied to `courseId`
  const assignment = {
    ...req.body,
    course: courseId,
  };

  try {
    // If `_id` is not provided, generate one
    if (!assignment._id) {
      assignment._id = Date.now().toString(); // Example: unique string ID
    }

    // Validate and save the new assignment
    const newAssignment = await assignDao.createAssignment(assignment);

    console.log("New assignment added:", newAssignment); // Debugging log
    res.status(201).json(newAssignment); // Respond with the created assignment
  } catch (error) {
    console.error("Error creating assignment:", error.message);
    res.status(400).json({ error: error.message });
  }
});

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });
 
  
}

