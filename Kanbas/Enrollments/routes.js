import * as enrollmentDao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function EnrollmentRoutes(app) {
  // Enroll a user in a course
  app.post("/api/enrollments", (req, res) => {
    try {
      const { userId, courseId } = req.body;

      // Validate inputs
      if (!userId || !courseId) {
        return res.status(400).send({ error: "User ID and Course ID are required" });
      }

      // Enroll the user
      enrollmentDao.enrollUserInCourse(userId, courseId);
      res.status(200).send({ message: "User enrolled successfully" });
    } catch (error) {
      console.error("Error enrolling user:", error.message);
      res.status(500).send({ error: "Failed to enroll user" });
    }
  });

  // Unenroll a user from a course
  app.delete("/api/enrollments", (req, res) => {
    try {
      const { userId, courseId } = req.body;

      // Validate inputs
      if (!userId || !courseId) {
        return res.status(400).send({ error: "User ID and Course ID are required" });
      }

      // Unenroll the user
      enrollmentDao.unenrollUserFromCourse(userId, courseId);
      res.status(200).send({ message: "User unenrolled successfully" });
    } catch (error) {
      console.error("Error unenrolling user:", error.message);
      res.status(500).send({ error: "Failed to unenroll user" });
    }
  });

  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    try {
      const enrollments = enrollmentDao.getAllEnrollments();
      res.status(200).send(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error.message);
      res.status(500).send({ error: "Failed to fetch enrollments" });
    }
  });
}
