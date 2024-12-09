import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignDao from "../Assignments/dao.js";
import * as quizDao from "../Quizzes/dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
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
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
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

  app.post("/api/courses/:courseId/quizzes", (req, res) => {
    const { courseId } = req.params; // Extract courseId
    const quiz = req.body; // Quiz data from request body

    try {
        // Check if quizId is provided
        if (!quiz._id) {
            return res.status(400).json({ error: "Quiz ID (_id) is required" });
        }

        // Create the quiz with the provided ID
        const newQuiz = quizDao.createQuiz({ ...quiz, course: courseId }, quiz._id);

        res.status(201).json(newQuiz); // Respond with the created quiz
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Failed to create quiz. Please try again later." });
    }
});

    // Retrieve all quizzes for a courseId
    app.get("/api/courses/:courseId/quizzes", (req, res) => {
      const { courseId } = req.params;
      try {
          const quizzes = quizDao.findQuizzesForCourse(courseId);
          if (quizzes.length === 0) {
              return res.status(404).json({ error: `No quizzes found for courseId: ${courseId}` });
          }
          res.status(200).json(quizzes);
      } catch (error) {
          console.error("Error fetching quizzes:", error);
          res.status(500).json({ error: "Internal server error" });
      }
  });
    
}

