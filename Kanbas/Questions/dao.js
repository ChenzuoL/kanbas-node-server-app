import Database from "../Database/index.js";

// Create a new question
export function createQuestion(question, questionId) {
    const newQuestion = { ...question, _id: questionId }; // Add a unique ID
    Database.questions = [...Database.questions, newQuestion]; // Add the question
    console.log("Database after adding question:", Database.questions); // Debugging log
    return newQuestion;
}

// Find all questions for a specific quiz
export function findQuestionsForQuiz(quizId) {
    const { questions } = Database;
    return questions.filter((question) => question.quizId === quizId);
}

// Find a question by its ID
export function findQuestionById(questionId) {
    const { questions } = Database;
    return questions.find((question) => question._id === questionId);
}

// Update a question by ID
export function updateQuestion(questionId, questionUpdates) {
    const { questions } = Database;
    const question = questions.find((question) => question._id === questionId);

    if (!question) {
        throw new Error(`Question with ID ${questionId} not found`);
    }

    Object.assign(question, questionUpdates); // Merge updates into the existing question
    return question;
}

// Delete a question by ID
export function deleteQuestion(questionId) {
    const { questions } = Database;
    const index = questions.findIndex((question) => question._id === questionId);

    if (index === -1) {
        throw new Error(`Question with ID ${questionId} not found`);
    }

    const [deletedQuestion] = questions.splice(index, 1); // Remove the question
    return deletedQuestion;
}
