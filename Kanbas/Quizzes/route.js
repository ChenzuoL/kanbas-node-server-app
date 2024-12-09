import * as quizDao from "./dao.js";
import * as questionDao from "../Questions/dao.js"; 

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
}
