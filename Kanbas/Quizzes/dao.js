import Database from "../Database/index.js";

// Create a new quiz
export function createQuiz(quiz, quizId) {
    const newQuiz = { ...quiz, _id: quizId }; // Generate a unique ID
    Database.quizzes = [...Database.quizzes, newQuiz]; // Add the new quiz
    console.log("Database after adding quiz:", Database.quizzes); // Debugging log
    return newQuiz;
}

// Find quizzes by courseId
export function findQuizzesForCourse(courseId) {
    const { quizzes } = Database;
    return quizzes.filter((quiz) => quiz.course === courseId);
}

// Find a quiz by its ID
export function findQuizById(quizId) {
    const { quizzes } = Database;
    return quizzes.find((quiz) => quiz._id === quizId);
}

// Update a quiz by ID
export function updateQuiz(quizId, quizUpdates) {
    const { quizzes } = Database;
    const quiz = quizzes.find((quiz) => quiz._id === quizId);

    if (!quiz) {
        throw new Error(`Quiz with ID ${quizId} not found`);
    }

    Object.assign(quiz, quizUpdates); // Merge updates into the existing quiz
    return quiz;
}

// Delete a quiz by ID
export function deleteQuiz(quizId) {
    const { quizzes } = Database;
    const index = quizzes.findIndex((quiz) => quiz._id === quizId);

    if (index === -1) {
        throw new Error(`Quiz with ID ${quizId} not found`);
    }

    const [deletedQuiz] = quizzes.splice(index, 1); // Remove the quiz
    return deletedQuiz;
}
