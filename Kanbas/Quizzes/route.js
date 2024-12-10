import * as quizDao from "./dao.js";
import * as questionDao from "../Questions/dao.js"; 
import * as answersDao from "../Answers/dao.js";

export default function QuizRoutes(app) {
    // Update a quiz by ID
    app.put("/api/quizzes/:id", (req, res) => {
        const { id: quizId } = req.params;
        const quizUpdates = req.body;
        try {
            const updatedQuiz = quizDao.updateQuiz(quizId, quizUpdates);
            res.status(200).json(updatedQuiz);
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(404).json({ error: error.message });
        }
    });

    // Delete a quiz by ID
    app.delete("/api/quizzes/:id", (req, res) => {
        const { id: quizId } = req.params;
        try {
            const deletedQuiz = quizDao.deleteQuiz(quizId);
            res.status(200).json(deletedQuiz);
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(404).json({ error: error.message });
        }
    });
    // Retrieve a single quiz by ID
    app.get("/api/quizzes/:qid", (req, res) => {
        const { qid } = req.params;
        const quiz = quizDao.findQuizById(qid);
        if (!quiz) {
            return res.status(404).json({ error: `Quiz with ID ${qid} not found` });
        }
        res.json(quiz);
    });
    // Retrieve all questions for a specific quiz
    app.get("/api/quizzes/:quizId/questions", (req, res) => {
        const { quizId } = req.params;
        try {
            const questions = questionDao.findQuestionsForQuiz(quizId);
            res.status(200).json(questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    // Create a new question for a quiz
    app.post("/api/quizzes/:quizId/questions", (req, res) => {
        const { quizId } = req.params;
        const question = req.body;
        try {
            const questionId = `QST${Date.now()}`; // Generate a unique ID for the question
            const newQuestion = questionDao.createQuestion({ ...question, quizId }, questionId);
            res.status(201).json(newQuestion);
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // Update a question by ID
    app.put("/api/questions/:id", (req, res) => {
        const { id: questionId } = req.params;
        const questionUpdates = req.body;
        try {
            const updatedQuestion = questionDao.updateQuestion(questionId, questionUpdates);
            res.status(200).json(updatedQuestion);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(404).json({ error: error.message });
        }
    });

    // Delete a question by ID
    app.delete("/api/questions/:id", (req, res) => {
        const { id: questionId } = req.params;
        try {
            const deletedQuestion = questionDao.deleteQuestion(questionId);
            res.status(200).json(deletedQuestion);
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(404).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId/answers/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const answers = answersDao.getUserAnswers(quizId, userId);
            res.status(200).json(answers);
        } catch (error) {
            console.error("Error fetching answers:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    app.post("/api/quizzes/:quizId/answers/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        const { answers } = req.body;
        try {
            const savedAnswers = answersDao.saveUserAnswers(quizId, userId, answers);
            res.status(201).json({ success: true, savedAnswers }); // Include success field
        } catch (error) {
            console.error("Error saving answers:", error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    });    
    
    // Get remaining attempts for a specific quiz and user
    app.get("/api/quizzes/:quizId/attempts/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const remainingAttempts = answersDao.getRemainingAttempts(quizId, userId);
            if (remainingAttempts === null) {
                return res.status(404).json({ error: "No attempts data found" });
            }
            res.status(200).json({ remainingAttempts });
        } catch (error) {
            console.error("Error fetching remaining attempts:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // Set initial remaining attempts for a quiz and user
    app.post("/api/quizzes/:quizId/attempts/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        const { totalAttempts } = req.body;

        if (totalAttempts === undefined || totalAttempts < 0) {
            return res.status(400).json({ error: "Invalid totalAttempts value" });
        }

        try {
            const attemptData = answersDao.setInitialRemainingAttempts(quizId, userId, totalAttempts);
            res.status(201).json(attemptData);
        } catch (error) {
            console.error("Error setting initial attempts:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // Update remaining attempts for a specific quiz and user
    app.put("/api/quizzes/:quizId/attempts/:userId", (req, res) => {
        const { quizId, userId } = req.params;
        const { totalAttempts } = req.body; // Default to 3 if not provided
    
        try {
            const updatedAttempts = answersDao.updateRemainingAttempts(quizId, userId, totalAttempts || 3);
            res.status(200).json(updatedAttempts);
        } catch (error) {
            console.error("Error updating remaining attempts:", error);
            res.status(400).json({ error: error.message });
        }
    });
    

}
